# S.A.R.A. - Supremo AI Response Assistant

![S.A.R.A. Logo](https://img.shields.io/badge/S.A.R.A.-AI%20Assistant-blue?style=for-the-badge&logo=robot)
![Version](https://img.shields.io/badge/version-2.0-brightgreen?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)

> An intelligent AI-powered chatbot for Supremo Traders, providing comprehensive stock market education and trading assistance with integrated broker recommendations.

## 🚀 Features

### 🤖 AI Capabilities
- **Advanced AI Chat**: Powered by Groq AI with Llama3-8b-8192 model
- **Educational Focus**: Specializes in stock market, forex, and cryptocurrency trading
- **Content Filtering**: Smart filtering to maintain professional conversations
- **Contextual Responses**: Understands trading terminology and market concepts

### 🏢 Supremo Traders Integration
- **Complete Course Information**: All training modules and programs
- **Team Details**: Updated team information including mentors and staff
- **Multi-Branch Support**: Coverage of all Maharashtra locations
- **Company Knowledge**: Complete organizational information and achievements

### 💼 VT Markets Integration (2025 Update)
- **Latest Broker Data**: 10th anniversary updates with current spreads and features
- **Account Types**: Standard STP, Raw ECN, Cent, and Swap-Free accounts
- **Real-time Information**: Current promotional offers and platform features
- **Professional Display**: Integrated logo and feature showcase

### 📱 Mobile & Desktop Support
- **Responsive Design**: Optimized for all screen sizes
- **PWA Ready**: Progressive web app capabilities
- **Touch-Friendly**: Mobile-optimized interface
- **APK Build Support**: Android app development ready

### 🎨 Modern UI/UX
- **Cyberpunk Design**: Futuristic Jarvis-style interface
- **Smooth Animations**: Framer Motion powered interactions
- **Dark Theme**: Professional dark mode interface
- **Component Library**: Radix UI with Tailwind CSS styling

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Framer Motion** for animations
- **TanStack Query** for state management
- **Wouter** for client-side routing

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Groq AI** for chat responses
- **Express Sessions** for authentication
- **PDF Processing** for document parsing
- **CORS** configured for cross-origin requests

### Database
- **Drizzle ORM** with PostgreSQL
- **In-memory storage** fallback for development
- **Neon Database** serverless support

### Deployment
- **Multiple Options**: Vercel, Railway, Heroku, DigitalOcean
- **Docker Support**: Containerized deployment ready
- **GitHub Actions**: CI/CD pipeline configured
- **Environment Variables**: Secure configuration management

## 📦 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Groq API key ([Get one here](https://console.groq.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/supremo-traders-sara-bot.git
cd supremo-traders-sara-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. **Start development server**
```bash
npm run dev
```

5. **Visit your application**
```
http://localhost:5000
```

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Required
GROQ_API_KEY=your_groq_api_key_here
SESSION_SECRET=your_strong_session_secret

# Optional
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url_if_using_external_db
```

## 🚀 Deployment Guide

### Method 1: Vercel (Recommended)

1. **Push to GitHub**
2. **Import to Vercel**
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables in Vercel**
   - `GROQ_API_KEY`: Your Groq AI API key
   - `SESSION_SECRET`: Strong session secret
   - `NODE_ENV`: production

### Method 2: Railway

1. **Connect GitHub repository** to Railway
2. **Configure environment variables**
3. **Deploy automatically** on push to main

### Method 3: Heroku

```bash
# Install Heroku CLI
heroku create supremo-traders-sara-bot
heroku config:set GROQ_API_KEY=your_key
heroku config:set SESSION_SECRET=your_secret
git push heroku main
```

### Method 4: Docker

```bash
# Build image
docker build -t sara-bot .

# Run container
docker run -p 5000:5000 \
  -e GROQ_API_KEY=your_key \
  -e SESSION_SECRET=your_secret \
  sara-bot
```

## 🔧 Configuration

### Admin Access
- **Username**: Admin
- **Password**: Admin
- **Features**: Chat management, PDF uploads, system monitoring

### Groq AI Setup
1. Visit [Groq Console](https://console.groq.com/)
2. Create account and generate API key
3. Add key to environment variables
4. Model: `llama3-8b-8192` (configured automatically)

### VT Markets Integration
- Logo and branding automatically integrated
- Latest 2025 data pre-loaded
- No additional setup required

## 📂 Project Structure

```
supremo-traders-sara-bot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── ...
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── groqAI.ts          # AI integration
│   ├── storage.ts         # Data storage
│   └── ...
├── shared/                # Shared types and schemas
├── attached_assets/       # Project assets
├── .env.example          # Environment template
├── vercel.json           # Vercel configuration
├── Dockerfile            # Docker configuration
├── DEPLOYMENT-GUIDE.md   # Detailed deployment instructions
└── README.md
```

## 🎯 Core Features

### Chat Interface
- **S.A.R.A. Greeting**: Professional welcome message
- **Smart Responses**: Context-aware trading education
- **Content Filtering**: Maintains professional conversation
- **Chat History**: Persistent conversation storage
- **Mobile Optimized**: Touch-friendly interface

### Admin Panel
- **Chat Management**: View and manage conversations
- **PDF Processing**: Upload and parse educational content
- **System Monitoring**: Health checks and status
- **User Analytics**: Basic usage statistics

### Educational Content
- **Course Information**: All Supremo Traders programs
- **Trading Strategies**: Comprehensive trading education
- **Market Analysis**: Technical and fundamental analysis
- **Risk Management**: Professional risk assessment

### Broker Integration
- **VT Markets Data**: Latest 2025 information
- **Account Comparisons**: Detailed account type analysis
- **Fee Structures**: Current spreads and commissions
- **Platform Features**: MT4/MT5 and mobile app details

## 🔒 Security

- **Environment Variables**: Secure API key management
- **Session Management**: Encrypted user sessions
- **Input Validation**: Zod schema validation
- **CORS Configuration**: Controlled cross-origin access
- **Content Filtering**: Professional conversation maintenance

## 📱 Mobile App Development

### APK Build Ready
- **Capacitor Integration**: Android app development
- **Build Scripts**: Automated APK generation
- **Mobile UI**: Touch-optimized interface
- **Performance**: Optimized for mobile devices

### Build Android APK
```bash
# Build for Android (when configured)
npm run build:android
```

## 🧪 Testing

### Manual Testing
- Open chat interface
- Test S.A.R.A. responses
- Try admin login (Admin/Admin)
- Test mobile responsiveness

### API Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Chat test
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are VT Markets account types?"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Q: S.A.R.A. not responding?**
A: Check your GROQ_API_KEY in environment variables

**Q: Login not working?**
A: Use Admin/Admin for admin access

**Q: Mobile connectivity issues?**
A: Verify CORS configuration and network connection

**Q: Deployment failing?**
A: Ensure all environment variables are set in your hosting platform

### Get Help
- Check [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions
- Review environment variables in `.env.example`
- Verify Groq API key is valid and active

## 🌟 Acknowledgments

- **Supremo Traders** - Educational content and expertise
- **VT Markets** - Broker partnership and data integration
- **Groq AI** - Advanced language model capabilities
- **React & Node.js Communities** - Excellent tooling and libraries

---

**S.A.R.A.** - Transforming trading education through AI-powered assistance. Built with ❤️ for Supremo Traders community.