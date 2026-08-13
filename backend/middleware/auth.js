import jwt from "jsonwebtoken";
import db from "../database/database.js";
import { JWT_SECRET } from "../config/env.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.startsWith("Bearer ")
    ? header.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      message: "Please sign in to access this page."
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = db
      .prepare("SELECT id, name, email FROM users WHERE id = ?")
      .get(payload.sub);

    if (!user) {
      return res.status(401).json({
        message: "This account could not be found."
      });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      message: "Your session has expired. Please sign in again."
    });
  }
}
