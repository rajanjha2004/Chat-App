import axios from "axios";

const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:5001" // 👈 yeh tumhare local backend ka URL hai
        : "https://chatting-app01-14olzdsex-rajan-jhas-projects-370b538f.vercel.app"; // 👈 production ke liye

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // agar cookies use ho rahi hain toh
});
