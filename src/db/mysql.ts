import mysql, { Pool } from 'mysql2/promise';
import dotenv from "dotenv"

dotenv.config()
class MySQL {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(): Pool {
    if (!MySQL.instance) {
      MySQL.instance = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'taskmanagement',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    return MySQL.instance;
  }
}

export default MySQL;
