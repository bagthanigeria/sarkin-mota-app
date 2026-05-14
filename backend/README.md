# SARKIN MOTA Backend API

Express.js REST API for the SARKIN MOTA Luxury Cars Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Redis (optional, for caching)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your configuration
```

### Development

```bash
# Run database migrations
npm run migrate

# Seed database (optional)
npm run seed

# Start development server
npm run dev
```

Server will run on `http://localhost:5000`

## 📚 Project Structure

```
src/
├── controllers/      # Route handlers
├── models/           # Database models
├── routes/           # API routes
├── services/         # Business logic
├── middlewares/      # Custom middlewares
├── utils/            # Utility functions
├── config/           # Configuration files
└── server.js         # Express app setup
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /api/v1` - API version info

### Authentication (TODO)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh token

### Vehicles (TODO)
- `GET /api/v1/vehicles` - List vehicles
- `GET /api/v1/vehicles/:id` - Get vehicle details
- `POST /api/v1/vehicles` - Create vehicle (dealer only)
- `PUT /api/v1/vehicles/:id` - Update vehicle (dealer only)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (dealer only)

### Bookings (TODO)
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings/:id` - Get booking
- `PUT /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Cancel booking

### Messages (TODO)
- `POST /api/v1/messages` - Send message
- `GET /api/v1/messages/:conversationId` - Get messages

### Transactions (TODO)
- `POST /api/v1/transactions` - Create transaction
- `GET /api/v1/transactions/:id` - Get transaction

For complete API documentation, see [API.md](../docs/API.md)

## 📝 Database

### Migrations

```bash
# Create new migration
npm run migrate:make create_users_table

# Run migrations
npm run migrate

# Rollback last batch
npm run migrate:rollback
```

### Seeds

```bash
# Create new seed
npm run seed:make seed_demo_data

# Run seeds
npm run seed
```

For database schema, see [DATABASE.md](../docs/DATABASE.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

## 📝 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check format
npm run format:check
```

## 🔒 Security Features

- **Helmet.js** - HTTP headers security
- **CORS** - Cross-origin resource sharing
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Express-validator
- **SQL Injection Prevention** - Parameterized queries (Knex)

## 📦 Key Dependencies

- **express** - Web framework
- **pg** - PostgreSQL driver
- **knex** - Query builder and migrations
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **aws-sdk** - AWS S3 integration
- **redis** - Caching
- **socket.io** - Real-time chat
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - CORS middleware
- **morgan** - HTTP logging

## 🚀 Deployment

For deployment instructions, see [DEPLOYMENT.md](../docs/DEPLOYMENT.md)

## 📖 Documentation

- [API Documentation](../docs/API.md)
- [Database Schema](../docs/DATABASE.md)
- [Architecture Guide](../docs/ARCHITECTURE.md)
- [Setup Instructions](../docs/SETUP.md)

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check PostgreSQL is running
psql -U postgres

# Update .env with correct credentials
```

### Port Already in Use
```bash
# Change port in .env
PORT=5001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- 📧 Email: dev@sarkinmota.com
- 💬 Issues: [GitHub Issues](https://github.com/bagthanigeria/sarkin-mota-app/issues)
- 📚 Docs: [Documentation](../docs/)

---

Made with ❤️ by SARKIN MOTA Team
