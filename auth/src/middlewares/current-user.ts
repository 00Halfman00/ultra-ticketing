import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_key } from '../config';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session?.jwt, jwt_key) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    throw new Error('Current User Error');
  }
  return next();
};
