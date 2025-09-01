// backend/src/index.js
import 'dotenv/config'; // ensures .env is loaded before anything else
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// We import app & server from socket.js (socket.js will create express app + http server + io)
import { app, server } from './../database/socket.js';

import authroute from '../routes/authroute.js';
import messageroute from "../routes/messageroute.js";
import connectdb from './../database/db.js';

const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

// Use CLIENT_URL env so you can change it in Railway (Vercel URL)
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const additionalAllowed = [
    'http://localhost:5173',
    'http://localhost:3000',
    CLIENT_URL
];

app.use(express.json ? express.json() : (req, res, next) => { /* no-op if express not passed here */ next(); });
// above line is just a safeguard if your socket.js already uses express() and attaches middleware
// If socket.js exports "app" that is an express instance, you can remove above line and instead:
app.use(express.json());
app.use(cookieParser());

// Proper CORS: allow local + deployed frontend (use CLIENT_URL env in Railway)
app.use(cors({
    origin: (origin, callback) => {
        // allow non-browser tools like Postman (no origin)
        if (!origin) return callback(null, true);
        if (additionalAllowed.indexOf(origin) !== -1) return callback(null, true);
        return callback(new Error('CORS policy - origin not allowed'), false);
    },
    credentials: true
}));

// routes
app.use('/', authroute);
app.use('/', messageroute);

// optional: serve frontend when you built it inside backend (if using monorepo build)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// connect DB first then start server
async function start() {
    try {
        await connectdb(); // assume this returns a Promise and connects mongoose
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV})`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

start();
