import type { Response, NextFunction } from 'express';
import type { AuthRequest } from './auth.js';

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}
