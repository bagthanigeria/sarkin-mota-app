// User types
export const USER_TYPES = {
  BUYER: 'buyer',
  DEALER: 'dealer',
  ADMIN: 'admin',
};

// Vehicle conditions
export const VEHICLE_CONDITIONS = {
  NEW: 'new',
  USED: 'used',
  CERTIFIED: 'certified',
};

// Vehicle status
export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  SOLD: 'sold',
};

// Booking types
export const BOOKING_TYPES = {
  TEST_DRIVE: 'test_drive',
  SHOWROOM_VISIT: 'showroom_visit',
  VIDEO_CALL: 'video_call',
};

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Transaction types
export const TRANSACTION_TYPES = {
  PURCHASE: 'purchase',
  DEPOSIT: 'deposit',
  PARTIAL: 'partial',
  FINANCING: 'financing',
};

// Transaction status
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Financing application status
export const FINANCING_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
};

// Image types
export const IMAGE_TYPES = {
  MAIN: 'main',
  EXTERIOR: 'exterior',
  INTERIOR: 'interior',
  THREE_SIXTY: '360',
  OTHER: 'other',
};

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  INTERNAL_ERROR: 'Internal server error',
  VALIDATION_ERROR: 'Validation failed',
};

// Success messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  FETCHED: 'Fetched successfully',
};
