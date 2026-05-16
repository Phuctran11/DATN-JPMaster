import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token.service.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    user_id: number;
    email: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const token = tokenService.extractToken(authHeader);
  
  if (!token) {
    return res.status(401).json({ error: 'Invalid authorization header format' });
  }

  const payload = tokenService.verifyToken(token);
  
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = {
    user_id: payload.user_id,
    email: payload.email,
    role: payload.role,
  };

  next();
};

export default authMiddleware;
