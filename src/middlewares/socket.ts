// ========== Socket
// import all modules
import { Request, Response, NextFunction } from 'express';

export const socket = (io: any) => (req: Request, res: Response, next: NextFunction) => {
  req.socket = io;
  next();
};
