import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No token provided.",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};
