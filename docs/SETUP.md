# Setup Guide

## Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/))
- **Redis** (Optional, for caching) ([Download](https://redis.io/))
- **Git** ([Download](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

---

## Backend Setup (Express.js)

### 1. Clone Repository

```bash
git clone https://github.com/bagthanigeria/sarkin-mota-app.git
cd sarkin-mota-app/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor
```

**Key Configuration:**

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sarkin_mota_dev
DB_USER=postgres
DB_PASSWORD=your_password
```

### 4. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
create database sarkin_mota_dev;
\q

# Run migrations
npm run migrate

# Seed sample data (optional)
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
==================================================
🏎️  SARKIN MOTA API Server
==================================================
✅ Server running on port 5000
📋 Environment: development
🔗 Health Check: http://localhost:5000/health
📚 API Docs: http://localhost:5000/api/v1
==================================================
```

### 6. Test API

```bash
# Health check
curl http://localhost:5000/health

# API version
curl http://localhost:5000/api/v1
```

---

## iOS Setup (Swift + SwiftUI)

### 1. Prerequisites

- **Xcode** 14+ ([Download](https://developer.apple.com/xcode/))
- **iOS 15.0+** deployment target
- **CocoaPods** (for dependencies)

### 2. Install CocoaPods

```bash
# If not already installed
sudo gem install cocoapods

# Navigate to iOS project
cd ../ios

# Install pods
pod install
```

### 3. Open Project

```bash
# Open workspace (NOT the .xcodeproj file)
open SarkinMota.xcworkspace
```

### 4. Configure API Base URL

In Xcode:
1. Select project → SarkinMota target
2. Go to Build Settings
3. Search for "API_BASE_URL"
4. Set to: `http://localhost:5000/api/v1` (development)

### 5. Run App

1. Select simulator (iPhone 14 Pro recommended)
2. Press ▶️ Play button or `Cmd + R`
3. App launches in simulator

---

## Android Setup (Kotlin + Jetpack Compose)

### 1. Prerequisites

- **Android Studio** 2023.1+ ([Download](https://developer.android.com/studio))
- **Android SDK** 33+ (API level 33+)
- **Java 11+**
- **Gradle** 8.0+

### 2. Open Project

```bash
# Navigate to Android directory
cd ../android

# Open in Android Studio
open -a "Android Studio" .
```

### 3. Configure API Base URL

Edit `app/build.gradle`:

```gradle
android {
    ...
    buildTypes {
        debug {
            buildConfigField "String", "API_BASE_URL", '"http://10.0.2.2:5000/api/v1"'
        }
        release {
            buildConfigField "String", "API_BASE_URL", '"https://api.sarkinmota.com/api/v1"'
        }
    }
}
```

### 4. Build Project

```bash
# In Android Studio terminal
./gradlew build

# Or use Android Studio's Build menu
```

### 5. Run App

1. Create virtual device or connect physical Android device
2. Click "Run" (▶️) in Android Studio
3. Select emulator/device
4. App installs and launches

---

## Database Migrations

### Create New Migration

```bash
cd backend
npm run migrate:make create_users_table
```

Edit the generated file in `migrations/`:

```javascript
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable('users');
}
```

### Run Migrations

```bash
npm run migrate
```

### Rollback Migrations

```bash
# Rollback last batch
npm run migrate:rollback

# Rollback to specific migration
npm run migrate:rollback -- --target migration_name
```

---

## Environment Variables

### Development (.env)

```env
# Server
NODE_ENV=development
PORT=5000
API_BASE_URL=http://localhost:5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sarkin_mota_dev
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d

# Payment (Get from respective providers)
PAYSTACK_SECRET_KEY=sk_test_xxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=sarkin-mota-dev
```

### Production (.env.production)

See `backend/.env.production` for production settings.

---

## Common Issues & Solutions

### Database Connection Failed

```bash
# Check PostgreSQL is running
psql -U postgres

# If connection fails, start PostgreSQL
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
net start postgresql-x64-XX
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CocoaPods Install Error (iOS)

```bash
# Update CocoaPods
sudo gem install cocoapods

# Clean and reinstall
rm -rf Pods Podfile.lock
pod install --repo-update
```

### Gradle Build Error (Android)

```bash
# Clean and rebuild
./gradlew clean build

# If still failing, check Java version
java -version  # Should be 11+
```

---

## Testing Setup

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

### iOS Tests

1. In Xcode: Product → Test (⌘U)
2. Tests run in simulator

### Android Tests

```bash
cd android

# Unit tests
./gradlew test

# Instrumented tests
./gradlew connectedAndroidTest
```

---

## Code Quality

### Backend

```bash
cd backend

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### iOS

Use Xcode's built-in formatting:
- Select code → Editor → Structure → Format

### Android

```bash
cd android
./gradlew spotlessApply
```

---

## Useful Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Knex.js Documentation](http://knexjs.org/)
- [Express.js Guide](https://expressjs.com/)
- [Swift Documentation](https://docs.swift.org/)
- [Kotlin Documentation](https://kotlinlang.org/docs/)
- [Android Development](https://developer.android.com/docs)

---

Last Updated: 2026-05-14
