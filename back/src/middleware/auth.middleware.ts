import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/middleware.types';
import dotenv from 'dotenv';
dotenv.config({ debug: false });

const JWT_SECRET = process.env.JWT_SECRET || '';

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    req.user = { id: payload.id, role: payload.role };

    return next();
  } catch (error) {
    console.error('Auth error', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
