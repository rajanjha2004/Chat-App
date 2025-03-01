import mongoose from "mongoose"
import dotenv from 'dotenv';

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connection to DB ${conn.connection.host} is succeeded`)
    } catch (err) {
        console.log(`MongoDB connection error => ${err}`)
    }
}
export default connectdb