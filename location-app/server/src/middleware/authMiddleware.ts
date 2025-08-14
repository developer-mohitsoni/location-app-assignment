import { type Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined) {
		res.status(401).json({
			status: 401,
			message: "Unauthorized"
		});

		return;
	}
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
  }
  
  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  }catch(err){
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}