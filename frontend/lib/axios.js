import axios from "axios";

const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5001" // 👈 yeh tumhare local backend ka URL hai
        : "https://chat-app-production-bc9b.up.railway.app"; // 👈 production ke liye

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // agar cookies use ho rahi hain toh
});
