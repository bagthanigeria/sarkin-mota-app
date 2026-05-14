/**
 * Send success response
 */
export const sendSuccessResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

/**
 * Send error response
 */
export const sendErrorResponse = (res, message, statusCode = 400, errors = null) => {
  res.status(statusCode).json({
    status: 'error',
    message,
    ...(errors && { errors }),
  });
};

/**
 * Send paginated response
 */
export const sendPaginatedResponse = (res, data, pagination, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
    pagination,
  });
};
