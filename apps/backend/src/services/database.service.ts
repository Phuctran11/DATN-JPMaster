import pool from "../config/database.js";

export class DatabaseService {
  async executeQuery(query: string, values?: unknown[]) {
    try {
      const result = await pool.query(query, values);
      return result;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

export default new DatabaseService();
