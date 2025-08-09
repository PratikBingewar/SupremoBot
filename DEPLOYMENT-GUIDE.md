# S.A.R.A. Chatbot - GitHub Deployment Guide

## Overview
This guide explains how to deploy your S.A.R.A. (Supremo AI Response Assistant) chatbot project to GitHub and various hosting platforms.

## Step 1: Prepare Project for GitHub

### 1.1 Create .gitignore File
```bash
# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Database
*.db
*.sqlite

# Uploads
uploads/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Replit specific
.replit
replit.nix
.upm/
```

### 1.2 Update package.json Scripts
Add deployment scripts:
```json
{
  "scripts": {
    "build": "vite build",
    "start": "node dist/server/index.js",
    "deploy": "npm run build && npm run start",
    "dev": "NODE_ENV=development tsx server/index.ts"
  }
}
```

## Step 2: Connect to GitHub

### Method 1: Using Replit's Git Integration
1. In your Replit project, click the **Version Control** tab (git icon)
2. Click **"Connect to GitHub"**
3. Authorize Replit to access your GitHub account
4. Choose **"Create a new repository"** or connect to existing one
5. Set repository name: `supremo-traders-sara-bot`
6. Make repository **Public** or **Private** as needed
7. Click **"Connect"**

### Method 2: Manual GitHub Setup
1. Create new repository on GitHub.com
2. Initialize git in your project:
```bash
git init
git add .
git commit -m "Initial commit: S.A.R.A. chatbot with VT Markets integration"
git branch -M main
git remote add origin https://github.com/yourusername/supremo-traders-sara-bot.git
git push -u origin main
```

## Step 3: Environment Variables Setup

### 3.1 Create .env.example
```bash
# Groq AI API Key
GROQ_API_KEY=your_groq_api_key_here

# Session Secret
SESSION_SECRET=your_session_secret_here

# Database URL (if using external database)
DATABASE_URL=your_database_url_here

# Port Configuration
PORT=5000
NODE_ENV=production
```

### 3.2 Document Required Secrets
Your deployment will need these environment variables:
- `GROQ_API_KEY`: Your Groq AI API key for S.A.R.A. responses
- `SESSION_SECRET`: Secret key for session management
- `PORT`: Server port (usually auto-configured by hosting platform)
- `NODE_ENV`: Set to "production" for live deployment

## Step 4: Deployment Options

### Option 1: Vercel (Recommended for Frontend + Serverless API)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Create vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ],
  "env": {
    "GROQ_API_KEY": "@groq_api_key",
    "SESSION_SECRET": "@session_secret"
  }
}
```

3. **Deploy:**
```bash
vercel --prod
```

### Option 2: Railway

1. **Connect GitHub Repository:**
   - Go to Railway.app
   - Click "Deploy from GitHub"
   - Select your repository

2. **Configure Environment Variables:**
   - Add `GROQ_API_KEY`
   - Add `SESSION_SECRET`
   - Add `NODE_ENV=production`

3. **Deploy automatically on git push**

### Option 3: Heroku

1. **Install Heroku CLI and login:**
```bash
heroku login
```

2. **Create Heroku app:**
```bash
heroku create supremo-traders-sara-bot
```

3. **Set environment variables:**
```bash
heroku config:set GROQ_API_KEY=your_key_here
heroku config:set SESSION_SECRET=your_secret_here
heroku config:set NODE_ENV=production
```

4. **Deploy:**
```bash
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. **Connect GitHub repository** on DigitalOcean App Platform
2. **Configure build settings:**
   - Build command: `npm run build`
   - Run command: `npm start`
3. **Set environment variables** in the dashboard
4. **Deploy** automatically from GitHub

## Step 5: Database Considerations

### For Production Database:
- **PostgreSQL**: Use services like Neon, Supabase, or Railway PostgreSQL
- **MongoDB**: Use MongoDB Atlas
- **SQLite**: Works for small deployments but not recommended for production

### Database Migration:
If using PostgreSQL, update your connection string in production environment variables.

## Step 6: Domain and SSL

### Custom Domain Setup:
1. **Purchase domain** (e.g., sarabot.com)
2. **Configure DNS** to point to your hosting platform
3. **SSL Certificate** is usually auto-configured by hosting platforms

## Step 7: Monitoring and Maintenance

### Recommended Tools:
- **Error Tracking**: Sentry or Rollbar
- **Analytics**: Google Analytics or Mixpanel  
- **Uptime Monitoring**: UptimeRobot or Pingdom
- **Performance**: Lighthouse CI

## Step 8: Continuous Deployment

### GitHub Actions Workflow (.github/workflows/deploy.yml):
```yaml
name: Deploy S.A.R.A. Bot
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build application
        run: npm run build
      - name: Deploy to production
        run: # Your deployment command here
```

## Troubleshooting Common Issues

### 1. Environment Variables Not Loading
- Ensure .env file is not committed to GitHub
- Verify environment variables are set in your hosting platform
- Check variable names match exactly

### 2. Build Failures
- Verify all dependencies are in package.json
- Check Node.js version compatibility
- Ensure TypeScript compilation succeeds

### 3. API Routes Not Working
- Verify server routing configuration
- Check CORS settings for production domain
- Ensure API endpoints are accessible

### 4. Database Connection Issues
- Update database connection strings for production
- Verify database server is accessible from hosting platform
- Check firewall and security group settings

## Security Checklist

- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] CORS configured for production domains only
- [ ] Rate limiting implemented for API endpoints
- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection enabled

## Performance Optimization

- [ ] Enable gzip compression
- [ ] Implement caching strategies
- [ ] Optimize images and assets
- [ ] Use CDN for static assets
- [ ] Monitor response times
- [ ] Implement database query optimization

Your S.A.R.A. chatbot is now ready for professional deployment with full VT Markets integration and mobile support!