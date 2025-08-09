# Overview

This is a full-stack chatbot web application for "Supremo Traders," a share market training institute. The application provides an intelligent trading assistant called "S.A.R.A. (Supremo AI Response Assistant)" that helps users with questions about stock markets, forex, cryptocurrency, trading education, and Supremo Traders' specific courses and services. The chatbot includes content filtering to maintain professional conversations and features an admin panel for managing chat logs and PDF content.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with **React 18** using **TypeScript** and implements a modern, Gen-Z focused UI design. The architecture follows these key decisions:

- **Component-based structure**: Uses React functional components with hooks for state management
- **Styling framework**: Tailwind CSS with custom design system featuring Supremo Traders' brand colors (blue/white primary, green for gains, red for losses)
- **UI component library**: Radix UI primitives with shadcn/ui components for consistent, accessible interface elements
- **State management**: React Query (TanStack Query) for server state management and local React state for UI interactions
- **Routing**: Wouter for lightweight client-side routing
- **Local storage**: Browser localStorage for persisting chat history between sessions

## Backend Architecture
The backend uses **Node.js with Express** and implements a REST API architecture:

- **API structure**: RESTful endpoints for chat interactions, admin authentication, and file management
- **Content filtering**: Custom filtering system that blocks inappropriate content, fee inquiries, and personal questions
- **AI integration**: OpenAI GPT-4o integration for intelligent chat responses
- **PDF processing**: pdf-parse library for extracting and processing course material content
- **Session management**: Express sessions for admin authentication
- **File uploads**: Multer middleware for handling PDF file uploads

## Data Storage Solutions
The application uses a **hybrid storage approach**:

- **Database schema**: Drizzle ORM with PostgreSQL for persistent data storage (chat messages, admin users, PDF content)
- **Fallback storage**: In-memory storage implementation for development/testing environments
- **Local storage**: Client-side storage for chat history persistence

## Authentication and Authorization
- **Admin authentication**: Session-based authentication for admin panel access
- **Content authorization**: Role-based access where admin features are protected behind login
- **No user authentication**: Public chat interface requires no user registration

## External Dependencies

### Core Technologies
- **React ecosystem**: React 18, TypeScript, Vite for build tooling
- **Backend framework**: Express.js with Node.js
- **Database**: PostgreSQL with Neon Database serverless
- **ORM**: Drizzle ORM for type-safe database operations

### AI and NLP Services
- **Groq AI API**: Llama3-8b-8192 model for generating intelligent chat responses
- **Content processing**: pdf-parse for PDF document text extraction

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **React Query**: Server state management

### File Storage and Processing
- **Google Cloud Storage**: Cloud file storage service integration
- **Multer**: Node.js middleware for handling multipart/form-data
- **Pre-loaded Content**: Supremo Traders company information and course details from PDF

### Development Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: JavaScript bundler for production builds
- **Replit integration**: Development environment plugins and error handling

## Recent Changes (August 2025)
- **Rebranded** from SupremoBot to S.A.R.A. (Supremo AI Response Assistant)
- **Migrated** from OpenAI API to Groq AI API using Llama3-8b-8192 model
- **Added** Supremo Traders logo integration using provided brand assets
- **Pre-loaded** complete company information and course content from PDF
- **Fixed** PDF parsing issues with dynamic imports
- **Updated** all UI components to reflect S.A.R.A. branding
- **Enhanced** welcome message and bot identity throughout the application
- **Updated** team information with accurate Supremo Traders staff details (January 2025)
- **Added** Amol Sable as Co Mentor to the team (August 2025)
- **Integrated** VT Markets 2025 data with 10th anniversary updates and current features
- **Added** VT Markets logo and professional broker partnership section in dashboard
- **Updated** AI knowledge base with latest VT Markets account types, spreads, and promotions
- **Created** comprehensive GitHub deployment guide with multiple hosting options
- **Prepared** project for GitHub with .gitignore, README.md, and deployment configurations
- **Enhanced** mobile connectivity with improved CORS and error handling
- **Integrated** web app link (https://supremo-bot-kadamatulp.replit.app) in dashboard
- **Configured** Capacitor for mobile app development with Android support
- **Created** APK build system with complete mobile app structure
- **Enhanced** mobile responsiveness with touch-friendly interactions
- **Removed** FAQ section below chat input for cleaner interface
- **Security Enhancement** (August 2025): Removed hardcoded API keys, enhanced .gitignore for secrets protection
- **Content Filtering Update**: Enhanced S.A.R.A. to never mention PDF files, presenting all information as built-in knowledge