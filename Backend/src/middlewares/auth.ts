import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user.role !== 'super_admin') return res.status(403).send('Access denied');
  next();
};
