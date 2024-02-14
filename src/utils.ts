import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export const verifyJWT = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers['authorization'];
  
  if (!token) return response.status(401).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || '', (err: any, decode: any) => {
    if (err) return response.status(401).json({ message: 'Invalid token' });
    next();
  });
};
