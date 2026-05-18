import databaseService from "../services/database.service.js";

export interface User {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role: "guest" | "learner" | "admin";
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  async createUser(
    username: string,
    email: string,
    passwordHash: string,
    role: "guest" | "learner" | "admin" = "learner"
  ): Promise<User> {
    const query = `
      INSERT INTO "User" (username, email, password_hash, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING user_id, username, email, password_hash, role, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [username, email, passwordHash, role]);
    return result.rows[0];
  }

  async getUserById(userId: number): Promise<User | null> {
    const query = `
      SELECT user_id, username, email, password_hash, role, created_at, updated_at
      FROM "User"
      WHERE user_id = $1;
    `;
    const result = await databaseService.executeQuery(query, [userId]);
    return result.rows[0] || null;
  }

  async getAllUsers(limit: number = 10, offset: number = 0): Promise<User[]> {
    const query = `
      SELECT user_id, username, email, password_hash, role, created_at, updated_at
      FROM "User"
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await databaseService.executeQuery(query, [limit, offset]);
    return result.rows;
  }

  async updateUser(userId: number, username: string, email: string, role: "guest" | "learner" | "admin"): Promise<User | null> {
    const query = `
      UPDATE "User"
      SET username = $1, email = $2, role = $3, updated_at = NOW()
      WHERE user_id = $4
      RETURNING user_id, username, email, password_hash, role, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [username, email, role, userId]);
    return result.rows[0] || null;
  }

  async updateUserProfile(userId: number, username: string, email: string): Promise<User | null> {
    const query = `
      UPDATE "User"
      SET username = $1, email = $2, updated_at = NOW()
      WHERE user_id = $3
      RETURNING user_id, username, email, password_hash, role, created_at, updated_at;
    `;
    const result = await databaseService.executeQuery(query, [username, email, userId]);
    return result.rows[0] || null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const query = `DELETE FROM "User" WHERE user_id = $1;`;
    const result = await databaseService.executeQuery(query, [userId]);
    return (result.rowCount ?? 0) > 0;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT user_id, username, email, password_hash, role, created_at, updated_at
      FROM "User"
      WHERE email = $1;
    `;
    const result = await databaseService.executeQuery(query, [email]);
    return result.rows[0] || null;
  }
}

export default new UserModel();
