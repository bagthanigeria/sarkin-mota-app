import { body, param, query } from 'express-validator';

/**
 * Email validation
 */
export const validateEmail = body('email')
  .trim()
  .isEmail()
  .normalizeEmail()
  .withMessage('Invalid email address');

/**
 * Password validation (min 8 chars, 1 uppercase, 1 number, 1 special char)
 */
export const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .withMessage('Password must contain uppercase, number, and special character');

/**
 * UUID validation
 */
export const validateUUID = param('id')
  .isUUID()
  .withMessage('Invalid UUID format');

/**
 * Pagination validation
 */
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

/**
 * Price range validation
 */
export const validatePriceRange = [
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
];
