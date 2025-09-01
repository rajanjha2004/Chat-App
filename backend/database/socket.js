// backend/database/socket.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// Use CLIENT_URL from env (set this on Railway to your Vercel URL)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = [CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'];

// Configure socket.io with proper CORS
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            // allow non-browser tools like Postman (no origin)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error('CORS policy: origin not allowed'), false);
        },
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Map to store online users: userId -> Set of socketIds
const userSocketMap = new Map(); // Map<string, Set<string>>

function addUserSocket(userId, socketId) {
    if (!userId) return;
    const set = userSocketMap.get(userId) || new Set();
    set.add(socketId);
    userSocketMap.set(userId, set);
}

function removeUserSocket(userId, socketId) {
    if (!userId) return;
    const set = userSocketMap.get(userId);
    if (!set) return;
    set.delete(socketId);
    if (set.size === 0) {
        userSocketMap.delete(userId);
    } else {
        userSocketMap.set(userId, set);
    }
}

// Returns the most-recent socketId for a user (or null)
// If you need all sockets, you can change this to return Array.from(set)
export function getReceiverSocketId(userId) {
    const set = userSocketMap.get(userId);
    if (!set || set.size === 0) return null;
    // return the last inserted socket id (iterate to the end)
    let last = null;
    for (const s of set) last = s;
    return last;
}

export function getOnlineUsers() {
    return Array.from(userSocketMap.keys());
}

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Support both handshake.auth and handshake.query for userId
    // (client can send: socket = io(SERVER, { auth: { userId } }) )
    const userId = socket.handshake.auth?.userId || socket.handshake.query?.userId;
    if (userId) {
        addUserSocket(userId, socket.id);
    }

    // Notify all clients about current online users (just the userIds)
    io.emit('getOnlineUsers', getOnlineUsers());

    // Example handlers (adapt to your app)
    socket.on('join-room', (roomId) => {
        if (roomId) socket.join(roomId);
    });

    socket.on('leave-room', (roomId) => {
        if (roomId) socket.leave(roomId);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
        // find and remove socketId from userSocketMap
        if (userId) {
            removeUserSocket(userId, socket.id);
        } else {
            // fallback: iterate map to remove socketId if userId wasn't provided earlier
            for (const [uid, set] of userSocketMap.entries()) {
                if (set.has(socket.id)) {
                    removeUserSocket(uid, socket.id);
                    break;
                }
            }
        }
        io.emit('getOnlineUsers', getOnlineUsers());
    });
});

export { io, app, server };
