import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

// Middleware to verify JWT tokens
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); 
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed' });
  }
};

export default authMiddleware;