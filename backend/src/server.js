import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ==================== ROUTES ====================

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API version endpoint
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'SARKIN MOTA API v1',
    version: process.env.APP_VERSION || '1.0.0',
    status: 'running',
  });
});

// ==================== PLACEHOLDER ROUTES ====================
// TODO: Import and use actual routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/vehicles', vehicleRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/bookings', bookingRoutes);
// app.use('/api/v1/messages', messageRoutes);
// app.use('/api/v1/transactions', transactionRoutes);

// ==================== ERROR HANDLING ====================

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
    path: req.originalUrl,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ==================== SERVER START ====================

const server = app.listen(PORT, () => {
  console.log(`
${'='.repeat(50)}`);
  console.log(`🏎️  SARKIN MOTA API Server`);
  console.log(`${'='.repeat(50)}`);
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📋 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/v1`);
  console.log(`${'='.repeat(50)}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
