// connectivity code server --> db

import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const db = mysql.createPool({ //help to msintsin multiple connections  and defining  the connectivity 
    host: process.env.SQL_HOST,
    database: process.env.SQL_DB,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    port: process.env.SQL_PORT,
    waitForConnections: true,
    connectionLimit:10,
    queueLimit: 0
}); 

export const connectDB = async () => {
    try {
        const connection = await db.getConnection();// to check connection which is important 
        console.log("db connected successfully");
        connection.release() // release the connection after use
    }catch (err) {
        console.error("Connection is not established",err)
        process.exit(1); 
    }
}
export default db;