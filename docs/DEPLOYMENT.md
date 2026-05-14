# SARKIN MOTA - Deployment Guide

## Prerequisites

- AWS Account (or alternative cloud provider)
- Docker & Docker Compose
- GitHub CLI & Git
- Node.js & npm
- PostgreSQL client tools
- Redis client tools

---

## Backend Deployment (Express.js)

### Option 1: AWS EC2

#### 1. Create EC2 Instance

```bash
# AWS CLI
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name your-key \
  --security-groups web-sg
```

#### 2. Connect & Setup

```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Update system
sudo yum update -y

# Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PostgreSQL client
sudo yum install -y postgresql

# Install Redis client
sudo yum install -y redis

# Install PM2 for process management
sudo npm install -g pm2
```

#### 3. Clone & Deploy

```bash
# Clone repository
git clone https://github.com/bagthanigeria/sarkin-mota-app.git
cd sarkin-mota-app/backend

# Install dependencies
npm install --production

# Setup environment
cp .env.production .env
# Edit .env with production values

# Run migrations
npm run migrate

# Start with PM2
pm2 start src/server.js --name "sarkin-mota-api"
pm2 save
pm2 startup
```

#### 4. Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo yum install -y nginx

# Create config
sudo tee /etc/nginx/conf.d/sarkin-mota.conf > /dev/null << EOF
upstream backend {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name api.sarkinmota.com;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 5. Setup SSL (Let's Encrypt)

```bash
# Install Certbot
sudo yum install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d api.sarkinmota.com

# Update Nginx config with SSL
sudo tee /etc/nginx/conf.d/sarkin-mota.conf > /dev/null << EOF
upstream backend {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name api.sarkinmota.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.sarkinmota.com;

    ssl_certificate /etc/letsencrypt/live/api.sarkinmota.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.sarkinmota.com/privkey.pem;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### Option 2: Docker & Docker Compose

#### 1. Create Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app code
COPY . .

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start app
CMD ["npm", "start"]
```

#### 2. Create Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: sarkin_mota_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_PORT: 5432
      REDIS_HOST: redis
      REDIS_PORT: 6379
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

#### 3. Deploy

```bash
# Copy environment variables
cp backend/.env.production .env

# Build and start
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migrate

# Check logs
docker-compose logs -f backend
```

### Option 3: Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create sarkin-mota-api

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Add Redis addon
heroku addons:create heroku-redis:premium-0

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate

# Check logs
heroku logs --tail
```

---

## Database Deployment

### AWS RDS PostgreSQL

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier sarkin-mota-prod \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourSecurePassword123! \
  --allocated-storage 20 \
  --publicly-accessible false

# Wait for instance to be available
aws rds describe-db-instances --db-instance-identifier sarkin-mota-prod

# Update .env with RDS endpoint
DB_HOST=sarkin-mota-prod.xxxxx.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=sarkin_mota_prod
DB_USER=admin
DB_PASSWORD=YourSecurePassword123!
```

### Database Backup

```bash
# Create automated backups
aws rds modify-db-instance \
  --db-instance-identifier sarkin-mota-prod \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00"

# Manual backup
aws rds create-db-snapshot \
  --db-instance-identifier sarkin-mota-prod \
  --db-snapshot-identifier sarkin-mota-backup-2026-05-14
```

---

## iOS App Deployment

### TestFlight Distribution

1. **Build Archive**
   - Xcode: Product → Archive
   - Select your team

2. **Upload to TestFlight**
   - Xcode Organizer → TestFlight tab
   - Click Upload
   - Select configuration (Debug/Release)
   - Wait for processing

3. **Add Testers**
   - App Store Connect → TestFlight → Internal Testing
   - Add testers (max 100 internal testers)
   - Or create external testing group (unlimited)

### App Store Release

1. **Prepare**
   - Version: Increment build number
   - Screenshots: Prepare store screenshots
   - Description: Write app description
   - Keywords: Add relevant keywords

2. **Submit**
   - Xcode: Product → Archive
   - Validate → Distribute App
   - Select App Store Connect
   - Complete app information
   - Submit for Review

3. **Review**
   - Apple reviews app (typically 1-3 days)
   - Respond to any questions
   - App approved → Release to App Store

---

## Android App Deployment

### Play Store Internal Testing

```bash
# Build APK/AAB
./gradlew bundleRelease

# Located at: app/build/outputs/bundle/release/app-release.aab
```

1. **Upload to Play Console**
   - Google Play Console → Internal Testing
   - Upload AAB file
   - Fill in release notes
   - Create release

2. **Add Testers**
   - Create email list for testers
   - Share testing link
   - Testers access via Play Store

### Play Store Release

1. **Prepare**
   - Version code: Increment by 1
   - Version name: Update (1.0.0, 1.1.0, etc.)
   - Release notes: Describe changes
   - Screenshots: 5-8 screenshots minimum

2. **Create Release**
   - Play Console → Production
   - Upload AAB
   - Add release notes
   - Set rollout percentage (start with 5-10%)
   - Monitor crashes/reviews
   - Gradually increase rollout

3. **Review**
   - Google reviews app (typically 2-4 hours)
   - App published when approved

---

## Monitoring & Logging

### Backend Monitoring

```bash
# PM2 Monitoring
pm2 monit

# PM2 Logs
pm2 logs sarkin-mota-api

# PM2 Plus (Cloud Monitoring)
pm2 plus
```

### CloudWatch (AWS)

```bash
# View logs
aws logs tail /aws/ec2/sarkin-mota-api --follow

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu \
  --alarm-description "Alert when CPU > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

### Sentry Error Tracking

```javascript
// backend/src/server.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.errorHandler());
```

---

## Scaling Checklist

- [ ] Database: Enable read replicas
- [ ] Cache: Configure Redis cluster
- [ ] CDN: Setup CloudFront for static assets
- [ ] Load Balancer: Setup application load balancer
- [ ] Auto Scaling: Configure EC2 auto scaling groups
- [ ] Monitoring: Setup CloudWatch alarms
- [ ] Logging: Aggregate logs to CloudWatch/ELK
- [ ] Performance: Run load tests
- [ ] Security: Enable WAF, security groups

---

## Troubleshooting

### High Memory Usage
```bash
# Check Node process memory
ps aux | grep node

# Increase heap size
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

### Database Connection Issues
```bash
# Test connection
psql -h <host> -U <user> -d <database>

# Check connection limits
SELECT * FROM pg_stat_activity;
```

### API Response Slow
```bash
# Enable query logging
SET log_min_duration_statement = 100;

# Analyze slow queries
EXPLAIN ANALYZE SELECT * FROM vehicles WHERE price > 1000000;
```

---

## Post-Deployment Verification

```bash
# Health check
curl https://api.sarkinmota.com/health

# API version
curl https://api.sarkinmota.com/api/v1

# Test database connection
curl -X GET https://api.sarkinmota.com/api/v1/vehicles

# Performance test
ab -n 100 -c 10 https://api.sarkinmota.com/health
```

---

Last Updated: 2026-05-14
