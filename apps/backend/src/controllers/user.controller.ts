import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model.js";
import passwordService from "../services/password.service.js";

type UserRole = "guest" | "learner" | "admin";
const VALID_ROLES: UserRole[] = ["guest", "learner", "admin"];

export class UserController {
  async googleLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }

      // Decode JWT token from Google (without verification for now)
      // In production, verify the token with Google's API
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const googleData = JSON.parse(jsonPayload);

      if (!googleData.email) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      const email = googleData.email;
      const username = googleData.name || email.split('@')[0];

      let user = await userModel.getUserByEmail(email);

      if (!user) {
        // Create new user from Google
        const passwordHash = await passwordService.hashPassword(`google_oauth_${Date.now()}`);
        user = await userModel.createUser(username, email, passwordHash, 'learner');
      }

      const { password_hash, ...userWithoutPassword } = user;
      return res.status(200).json({ message: 'Google login successful', data: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
      }

      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await passwordService.comparePassword(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const { password_hash, ...userWithoutPassword } = user;
      return res.status(200).json({ message: "Login successful", data: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role = "learner" } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: "username, email, and password are required" });
      }

      if (!VALID_ROLES.includes(role)) {
        return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` });
      }

      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const passwordHash = await passwordService.hashPassword(password);
      const user = await userModel.createUser(username, email, passwordHash, role as UserRole);

      return res.status(201).json({ message: "User created successfully", data: user });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Math.min(Number(req.query.limit) || 10, 100);
      const offset = Number(req.query.offset) || 0;

      const users = await userModel.getAllUsers(limit, offset);
      return res.status(200).json({ data: users, count: users.length });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await userModel.getUserById(Number(id));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { username, email, role } = req.body;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      if (!username || !email || !role) {
        return res.status(400).json({ error: "username, email, and role are required" });
      }

      if (!VALID_ROLES.includes(role)) {
        return res.status(400).json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` });
      }

      const existingUser = await userModel.getUserById(Number(id));
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = await userModel.updateUser(Number(id), username, email, role as UserRole);
      return res.status(200).json({ message: "User updated successfully", data: user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const success = await userModel.deleteUser(Number(id));

      if (!success) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
