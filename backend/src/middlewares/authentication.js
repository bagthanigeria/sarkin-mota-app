import jwt from 'jsonwebtoken';

/**
 * Verify JWT token from Authorization header
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
};

/**
 * Verify JWT token and check user role
 */
export const verifyTokenWithRole = (requiredRoles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!requiredRoles.includes(decoded.userType)) {
      return res.status(403).json({
        status: 'error',
        message: 'Insufficient permissions',
      });
    }

    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
};
