import express from "express"
import dotenv from "dotenv"
import authroute from '../routes/authroute.js';
import connectdb from './../database/db.js';
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageroute from "../routes/messageroute.js";
import { app, server } from "./../database/socket.js";

dotenv.config()
const Port = process.env.PORT
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // frontend ka local URL
    credentials: true
}));


app.use('/', authroute)
app.use('/', messageroute);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


server.listen(Port, () => {
    console.log(`Server is running at port ${Port}`)
    connectdb()
});