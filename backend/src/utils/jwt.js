import jwt from 'jsonwebtoken';

/**
 * Generate JWT access token
 */
export const generateAccessToken = (userId, userType) => {
  return jwt.sign(
    { userId, userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' },
  );
};

/**
 * Generate JWT refresh token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d' },
  );
};

/**
 * Verify JWT token
 */
export const verifyJWT = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

/**
 * Decode JWT token (without verification)
 */
export const decodeJWT = (token) => {
  return jwt.decode(token);
};
