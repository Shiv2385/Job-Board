// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
        if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "Not authorized, user not found" });

        req.user = user; // attach user to request
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(401).json({ message: "Token invalid or expired" });
    }
};
