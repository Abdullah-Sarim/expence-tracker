import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface JwtPayload {
  id: string;
}

export interface Authrequest extends Request {
  user?: JwtPayload;
}

const protect = (req: Authrequest, res: Response, next: NextFunction) => {
  try {

    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

  
    const token = authHeader.split(" ")[1];

  
    const decoded = jwt.verify(
      token,
      process.env.SECRETKEY as string
    ) as JwtPayload;

  
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default protect;