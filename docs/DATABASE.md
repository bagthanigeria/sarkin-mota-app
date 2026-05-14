# SARKIN MOTA Database Schema

## Database: PostgreSQL 12+

---

## 📊 Entity Relationship Diagram

```
Users (1) ──── (M) Vehicles
   |
   ├─── Wishlist (M)
   ├─── Bookings (M)
   ├─── Transactions (M)
   ├─── ChatMessages (M)
   └─── Reviews (M)

Vehicles (1) ──── (M) VehicleSpecifications
           ──── (M) VehicleImages
           ──── (M) VehicleVideos
           ──── (M) Bookings
           ──── (M) Reviews
           ──── (M) Wishlist
           ──── (M) ChatMessages

FinancingApplications (M) ──── (1) FinancingOptions
```

---

## Tables

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  user_type ENUM('buyer', 'dealer', 'admin') DEFAULT 'buyer',
  profile_image_url TEXT,
  bio TEXT,
  location VARCHAR(255),
  
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  phone_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  
  google_id VARCHAR(255) UNIQUE,
  facebook_id VARCHAR(255) UNIQUE,
  
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_user_type (user_type)
);
```

### 2. Vehicles Table
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  color VARCHAR(50),
  condition ENUM('new', 'used', 'certified') DEFAULT 'used',
  mileage INT DEFAULT 0,
  
  price DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'NGN',
  discount_percent DECIMAL(5, 2),
  discounted_price DECIMAL(15, 2),
  
  description TEXT,
  main_image_url TEXT,
  images_count INT DEFAULT 0,
  has_video_tour BOOLEAN DEFAULT false,
  has_360_images BOOLEAN DEFAULT false,
  has_ar_model BOOLEAN DEFAULT false,
  
  location VARCHAR(255),
  seller_id UUID NOT NULL REFERENCES users(id),
  availability_status ENUM('available', 'reserved', 'sold') DEFAULT 'available',
  
  exterior_color VARCHAR(50),
  interior_color VARCHAR(50),
  
  view_count INT DEFAULT 0,
  saved_count INT DEFAULT 0,
  inquiry_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  featured_until TIMESTAMP,
  deleted_at TIMESTAMP,
  
  INDEX idx_brand_model (brand, model),
  INDEX idx_seller_id (seller_id),
  INDEX idx_price (price),
  INDEX idx_year (year),
  INDEX idx_condition (condition),
  INDEX idx_availability (availability_status),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (seller_id) REFERENCES users(id)
);
```

### 3. Vehicle Specifications Table
```sql
CREATE TABLE vehicle_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL UNIQUE REFERENCES vehicles(id) ON DELETE CASCADE,
  
  engine_power INT,
  engine_type VARCHAR(50),
  engine_displacement INT,
  cylinders INT,
  turbo BOOLEAN DEFAULT false,
  
  transmission VARCHAR(50),
  fuel_type VARCHAR(50),
  acceleration_0_100 DECIMAL(4, 2),
  top_speed INT,
  
  fuel_tank_capacity INT,
  fuel_efficiency DECIMAL(6, 2),
  electric_range INT,
  battery_capacity DECIMAL(8, 2),
  
  length INT,
  width INT,
  height INT,
  wheelbase INT,
  weight INT,
  
  seats INT,
  cargo_volume INT,
  max_towing_capacity INT,
  
  drivetrain VARCHAR(50),
  
  has_sunroof BOOLEAN DEFAULT false,
  has_leather_interior BOOLEAN DEFAULT false,
  has_panoramic_roof BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_engine_power (engine_power),
  INDEX idx_fuel_type (fuel_type)
);
```

### 4. Vehicle Images Table
```sql
CREATE TABLE vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type ENUM('main', 'exterior', 'interior', '360', 'other') DEFAULT 'other',
  display_order INT,
  alt_text VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_image_type (image_type)
);
```

### 5. Vehicle Videos Table
```sql
CREATE TABLE vehicle_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  video_type ENUM('tour', 'review', 'specification') DEFAULT 'tour',
  title VARCHAR(255),
  description TEXT,
  duration INT,
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_vehicle_id (vehicle_id)
);
```

### 6. Bookings Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  
  booking_type ENUM('test_drive', 'showroom_visit', 'video_call') DEFAULT 'test_drive',
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  confirmation_code VARCHAR(20) UNIQUE,
  
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  actual_date DATE,
  actual_time TIME,
  
  notes TEXT,
  special_requests TEXT,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  
  completed_at TIMESTAMP,
  cancellation_reason TEXT,
  cancelled_by ENUM('user', 'seller', 'admin'),
  cancelled_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_status (status),
  INDEX idx_preferred_date (preferred_date)
);
```

### 7. Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  transaction_type ENUM('purchase', 'deposit', 'partial', 'financing') DEFAULT 'purchase',
  status ENUM('pending', 'processing', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_method ENUM('paystack', 'flutterwave', 'stripe', 'bank_transfer') NOT NULL,
  
  buyer_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES users(id),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'NGN',
  commission DECIMAL(15, 2),
  final_amount DECIMAL(15, 2),
  
  payment_reference VARCHAR(255) UNIQUE,
  payment_gateway_response JSONB,
  
  has_financing BOOLEAN DEFAULT false,
  financing_id UUID,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  refunded_at TIMESTAMP,
  refund_reason TEXT,
  
  INDEX idx_buyer_id (buyer_id),
  INDEX idx_seller_id (seller_id),
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_status (status),
  INDEX idx_payment_reference (payment_reference)
);
```

### 8. Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  content TEXT,
  
  condition_rating INT CHECK (condition_rating >= 1 AND condition_rating <= 5),
  price_rating INT CHECK (price_rating >= 1 AND price_rating <= 5),
  seller_rating INT CHECK (seller_rating >= 1 AND seller_rating <= 5),
  
  is_verified_purchase BOOLEAN DEFAULT false,
  helpful_count INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  
  UNIQUE KEY unique_user_vehicle_review (user_id, vehicle_id),
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_user_id (user_id),
  INDEX idx_rating (rating)
);
```

### 9. Wishlist Table
```sql
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  price_at_save DECIMAL(15, 2),
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_user_vehicle (user_id, vehicle_id),
  INDEX idx_user_id (user_id),
  INDEX idx_vehicle_id (vehicle_id)
);
```

### 10. Chat Messages Table
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  sender_id UUID NOT NULL REFERENCES users(id),
  receiver_id UUID NOT NULL REFERENCES users(id),
  
  vehicle_id UUID REFERENCES vehicles(id),
  
  message_text TEXT NOT NULL,
  message_type ENUM('text', 'image', 'document') DEFAULT 'text',
  attachment_url TEXT,
  
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_sender_id (sender_id),
  INDEX idx_receiver_id (receiver_id),
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
);
```

### 11. Financing Options Table
```sql
CREATE TABLE financing_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  provider_name VARCHAR(255) NOT NULL,
  description TEXT,
  
  min_duration INT,
  max_duration INT,
  min_interest_rate DECIMAL(6, 3),
  max_interest_rate DECIMAL(6, 3),
  min_down_payment DECIMAL(5, 2),
  max_down_payment DECIMAL(5, 2),
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_provider_name (provider_name)
);
```

### 12. Financing Applications Table
```sql
CREATE TABLE financing_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES users(id),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id),
  financing_option_id UUID REFERENCES financing_options(id),
  
  status ENUM('draft', 'submitted', 'approved', 'rejected', 'completed') DEFAULT 'draft',
  vehicle_price DECIMAL(15, 2),
  down_payment DECIMAL(15, 2),
  loan_amount DECIMAL(15, 2),
  loan_duration INT,
  interest_rate DECIMAL(6, 3),
  monthly_payment DECIMAL(15, 2),
  
  credit_score INT,
  income_verification_url TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP,
  decision_at TIMESTAMP,
  decision_reason TEXT,
  
  INDEX idx_user_id (user_id),
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_status (status)
);
```

### 13. Saved Searches Table
```sql
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  search_name VARCHAR(255) NOT NULL,
  search_filters JSONB NOT NULL,
  
  notify_on_match BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id)
);
```

### 14. Analytics Events Table
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID REFERENCES users(id),
  vehicle_id UUID REFERENCES vehicles(id),
  
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at)
);
```

---

## Indexes Strategy

**Primary Indexes**:
- User lookup: `email`, `phone`, `user_type`
- Vehicle lookup: `brand`, `model`, `price`, `year`, `condition`
- Search optimization: Composite indexes on frequently filtered fields
- Relationship indexes: All foreign keys

**Secondary Indexes**:
- Timestamps for range queries: `created_at`, `updated_at`
- Status fields: `status`, `availability_status`
- Analytics: `event_type`, `vehicle_id`

---

## Optional Views

```sql
CREATE VIEW popular_vehicles AS
SELECT 
  v.id, v.brand, v.model, v.price,
  COUNT(DISTINCT a.id) as total_views,
  COUNT(DISTINCT w.id) as saved_count
FROM vehicles v
LEFT JOIN analytics_events a ON v.id = a.vehicle_id AND a.event_type = 'view'
LEFT JOIN wishlist w ON v.id = w.vehicle_id
WHERE v.deleted_at IS NULL
GROUP BY v.id;

CREATE VIEW top_sellers AS
SELECT 
  u.id, u.first_name, u.last_name, u.rating,
  COUNT(DISTINCT v.id) as total_listings,
  COUNT(DISTINCT t.id) as total_sales
FROM users u
LEFT JOIN vehicles v ON u.id = v.seller_id
LEFT JOIN transactions t ON u.id = t.seller_id
WHERE u.user_type = 'dealer'
GROUP BY u.id;
```

---

Last Updated: 2026-05-14
