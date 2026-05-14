# SARKIN MOTA API Documentation

## Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.sarkinmota.com/api/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

### Response Format

#### Success Response (2xx)
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {}
}
```

#### Error Response (4xx, 5xx)
```json
{
  "status": "error",
  "message": "Error description",
  "errors": []
}
```

---

## 👤 Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+234801234567",
  "password": "SecurePass123!",
  "userType": "buyer"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "userType": "buyer",
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Status Codes:** 201 Created, 400 Bad Request, 409 Conflict

---

### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "userType": "buyer"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 404 Not Found

---

### Refresh Token
**POST** `/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Token refreshed",
  "data": {
    "accessToken": "eyJhbGc..."
  }
}
```

**Status Codes:** 200 OK, 401 Unauthorized

---

## 🚗 Vehicle Endpoints

### List Vehicles
**GET** `/vehicles`

**Query Parameters:**
```
?page=1
&limit=20
&minPrice=5000000
&maxPrice=500000000
&brand=Mercedes-Benz
&model=S-Class
&year=2023
&condition=used
&minPower=300
&maxPower=500
&minSpeed=200
&maxSpeed=300
&minTowing=2000
&maxTowing=5000
&transmission=automatic
&fuelType=petrol
&search=luxury
```

**Response:**
```json
{
  "status": "success",
  "message": "Vehicles fetched successfully",
  "data": [
    {
      "id": "uuid",
      "brand": "Mercedes-Benz",
      "model": "S-Class",
      "year": 2023,
      "price": 45000000,
      "condition": "used",
      "mileage": 15000,
      "mainImageUrl": "https://...",
      "location": "Lagos",
      "availability": "available",
      "viewCount": 256,
      "savedCount": 12
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

**Status Codes:** 200 OK, 400 Bad Request

---

### Get Vehicle Details
**GET** `/vehicles/:id`

**Response:**
```json
{
  "status": "success",
  "message": "Vehicle details fetched",
  "data": {
    "id": "uuid",
    "brand": "Mercedes-Benz",
    "model": "S-Class",
    "year": 2023,
    "color": "Black",
    "price": 45000000,
    "condition": "used",
    "mileage": 15000,
    "description": "...",
    "mainImageUrl": "https://...",
    "images": [
      {
        "url": "https://...",
        "type": "exterior"
      }
    ],
    "specifications": {
      "enginePower": 435,
      "engineType": "V8",
      "transmission": "automatic",
      "fuelType": "petrol",
      "acceleration0to100": 4.6,
      "topSpeed": 250,
      "fuelTankCapacity": 80,
      "fuelEfficiency": 8.5,
      "seats": 5,
      "cargoVolume": 563,
      "maxTowingCapacity": 2000,
      "drivetrain": "RWD"
    },
    "seller": {
      "id": "uuid",
      "name": "SARKIN MOTA",
      "email": "seller@sarkinmota.com",
      "phone": "+234801234567",
      "rating": 4.8,
      "reviews": 125
    },
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "title": "Excellent car",
        "content": "Very satisfied with the purchase",
        "author": "John Doe",
        "createdAt": "2026-05-14T10:00:00Z"
      }
    ]
  }
}
```

**Status Codes:** 200 OK, 404 Not Found

---

### Create Vehicle (Dealer Only)
**POST** `/vehicles`

**Authentication Required:** Yes (Bearer Token)
**Required Role:** dealer, admin

**Request Body:**
```json
{
  "brand": "Mercedes-Benz",
  "model": "S-Class",
  "year": 2023,
  "color": "Black",
  "price": 45000000,
  "currency": "NGN",
  "condition": "used",
  "mileage": 15000,
  "description": "Luxury sedan...",
  "location": "Lagos",
  "specifications": {
    "enginePower": 435,
    "engineType": "V8",
    "transmission": "automatic",
    "fuelType": "petrol",
    "acceleration0to100": 4.6,
    "topSpeed": 250,
    "maxTowingCapacity": 2000
  }
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Vehicle created successfully",
  "data": {
    "id": "uuid",
    "brand": "Mercedes-Benz",
    "model": "S-Class",
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

**Status Codes:** 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden

---

### Update Vehicle (Dealer Only)
**PUT** `/vehicles/:id`

**Authentication Required:** Yes (Bearer Token)
**Required Role:** dealer, admin

**Request Body:** Same as Create Vehicle

**Response:**
```json
{
  "status": "success",
  "message": "Vehicle updated successfully",
  "data": { ... }
}
```

**Status Codes:** 200 OK, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found

---

### Delete Vehicle (Dealer Only)
**DELETE** `/vehicles/:id`

**Authentication Required:** Yes (Bearer Token)
**Required Role:** dealer, admin

**Response:**
```json
{
  "status": "success",
  "message": "Vehicle deleted successfully"
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 403 Forbidden, 404 Not Found

---

## 📅 Booking Endpoints

### Create Booking
**POST** `/bookings`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "vehicleId": "uuid",
  "bookingType": "test_drive",
  "preferredDate": "2026-05-20",
  "preferredTime": "14:00",
  "notes": "Would like to test the comfort features",
  "specialRequests": "Morning appointment preferred"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Booking created successfully",
  "data": {
    "id": "uuid",
    "confirmationCode": "SMB20260514001",
    "vehicleId": "uuid",
    "bookingType": "test_drive",
    "status": "pending",
    "preferredDate": "2026-05-20",
    "preferredTime": "14:00",
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

**Status Codes:** 201 Created, 400 Bad Request, 401 Unauthorized

---

### Get Booking
**GET** `/bookings/:id`

**Authentication Required:** Yes (Bearer Token)

**Response:**
```json
{
  "status": "success",
  "message": "Booking fetched successfully",
  "data": {
    "id": "uuid",
    "confirmationCode": "SMB20260514001",
    "vehicle": { ... },
    "seller": { ... },
    "status": "confirmed",
    "actualDate": "2026-05-20",
    "actualTime": "14:00",
    "completedAt": null
  }
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 404 Not Found

---

### Update Booking
**PUT** `/bookings/:id`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "status": "confirmed",
  "preferredDate": "2026-05-21",
  "preferredTime": "15:00"
}
```

**Response:** Same as Get Booking

**Status Codes:** 200 OK, 400 Bad Request, 401 Unauthorized, 404 Not Found

---

### Cancel Booking
**DELETE** `/bookings/:id`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "cancellationReason": "Schedule conflict"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Booking cancelled successfully"
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 404 Not Found

---

## 💬 Message Endpoints

### Send Message
**POST** `/messages`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "receiverId": "uuid",
  "vehicleId": "uuid",
  "messageText": "Is this vehicle still available?",
  "messageType": "text"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Message sent successfully",
  "data": {
    "id": "uuid",
    "senderId": "uuid",
    "receiverId": "uuid",
    "messageText": "Is this vehicle still available?",
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

**Status Codes:** 201 Created, 400 Bad Request, 401 Unauthorized

---

### Get Messages
**GET** `/messages/conversation/:conversationId`

**Authentication Required:** Yes (Bearer Token)

**Query Parameters:**
```
?page=1&limit=50
```

**Response:**
```json
{
  "status": "success",
  "message": "Messages fetched successfully",
  "data": [
    {
      "id": "uuid",
      "senderId": "uuid",
      "senderName": "John Doe",
      "messageText": "Is this vehicle still available?",
      "createdAt": "2026-05-14T10:00:00Z",
      "isRead": true
    }
  ],
  "pagination": { ... }
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 404 Not Found

---

## 💳 Transaction Endpoints

### Create Transaction
**POST** `/transactions`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "vehicleId": "uuid",
  "sellerId": "uuid",
  "amount": 45000000,
  "currency": "NGN",
  "transactionType": "purchase",
  "paymentMethod": "paystack",
  "hasFinancing": false
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Transaction initiated",
  "data": {
    "id": "uuid",
    "paymentReference": "SARKIN_20260514_001",
    "amount": 45000000,
    "status": "pending",
    "paymentUrl": "https://checkout.paystack.com/...",
    "createdAt": "2026-05-14T10:00:00Z"
  }
}
```

**Status Codes:** 201 Created, 400 Bad Request, 401 Unauthorized

---

### Get Transaction
**GET** `/transactions/:id`

**Authentication Required:** Yes (Bearer Token)

**Response:**
```json
{
  "status": "success",
  "message": "Transaction fetched successfully",
  "data": {
    "id": "uuid",
    "paymentReference": "SARKIN_20260514_001",
    "amount": 45000000,
    "status": "completed",
    "transactionType": "purchase",
    "vehicle": { ... },
    "completedAt": "2026-05-14T11:00:00Z"
  }
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 404 Not Found

---

## 👤 User Endpoints

### Get User Profile
**GET** `/users/profile`

**Authentication Required:** Yes (Bearer Token)

**Response:**
```json
{
  "status": "success",
  "message": "Profile fetched successfully",
  "data": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+234801234567",
    "userType": "buyer",
    "profileImageUrl": "https://...",
    "location": "Lagos",
    "rating": 4.8,
    "totalReviews": 12,
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

**Status Codes:** 200 OK, 401 Unauthorized

---

### Update User Profile
**PUT** `/users/profile`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+234801234567",
  "location": "Lagos",
  "bio": "Luxury car enthusiast"
}
```

**Response:** Same as Get User Profile

**Status Codes:** 200 OK, 400 Bad Request, 401 Unauthorized

---

## ⭐ Wishlist Endpoints

### Add to Wishlist
**POST** `/wishlist`

**Authentication Required:** Yes (Bearer Token)

**Request Body:**
```json
{
  "vehicleId": "uuid"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Added to wishlist",
  "data": { "id": "uuid", "vehicleId": "uuid" }
}
```

**Status Codes:** 201 Created, 400 Bad Request, 401 Unauthorized

---

### Get Wishlist
**GET** `/wishlist`

**Authentication Required:** Yes (Bearer Token)

**Query Parameters:**
```
?page=1&limit=20
```

**Response:**
```json
{
  "status": "success",
  "message": "Wishlist fetched successfully",
  "data": [ ... ]
}
```

**Status Codes:** 200 OK, 401 Unauthorized

---

### Remove from Wishlist
**DELETE** `/wishlist/:vehicleId`

**Authentication Required:** Yes (Bearer Token)

**Response:**
```json
{
  "status": "success",
  "message": "Removed from wishlist"
}
```

**Status Codes:** 200 OK, 401 Unauthorized, 404 Not Found

---

## Error Codes

| Code | Status | Message | Solution |
|------|--------|---------|----------|
| 400 | Bad Request | Invalid request parameters | Check request format and required fields |
| 401 | Unauthorized | Missing or invalid token | Provide valid Bearer token |
| 403 | Forbidden | Insufficient permissions | User role lacks required permissions |
| 404 | Not Found | Resource not found | Verify resource ID exists |
| 409 | Conflict | Resource already exists | Check for duplicate entries |
| 422 | Unprocessable Entity | Validation error | Check field values match requirements |
| 429 | Too Many Requests | Rate limit exceeded | Wait before making new requests |
| 500 | Internal Server Error | Server error | Contact support |

---

## Rate Limiting

API endpoints are rate limited:
- **Default:** 100 requests per 15 minutes per IP
- **Authentication:** 30 requests per 15 minutes for login/register
- **Upload:** 10 requests per hour

**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

---

## Pagination

Paginated endpoints return:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

Last Updated: 2026-05-14
