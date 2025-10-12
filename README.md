# CtrlArt - Full-Stack Newsletter Application

A modern React + Node.js application with email newsletter functionality.

## 🏗️ Project Structure

```
CtrlArt/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   └── NewsletterSignup.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js + Express API
│   ├── server.js
│   ├── package.json
│   └── env.example
└── package.json       # Root monorepo config
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Set Up Environment Variables
```bash
cd backend
cp env.example .env
# Edit .env with your email credentials
```

### 3. Start Development Servers
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📧 Email Configuration

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate an App Password
   - Use your Gmail and App Password in `.env`

2. **Other Email Services:**
   - Update the transporter configuration in `backend/server.js`
   - Supported: SendGrid, AWS SES, Mailgun, etc.

## 🛠️ Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only React app
- `npm run dev:backend` - Start only API server
- `npm run build` - Build frontend for production
- `npm start` - Start production backend

## 🔧 API Endpoints

- `GET /api/health` - Health check
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

## 📦 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Modern ES6+ JavaScript

**Backend:**
- Node.js
- Express.js
- Nodemailer
- CORS enabled
- Input validation

## 🌟 Features

- ✅ Responsive design with Tailwind CSS
- ✅ Dark mode support
- ✅ Email newsletter subscription
- ✅ Form validation
- ✅ Error handling
- ✅ Modern UI/UX
- ✅ CORS configured for frontend-backend communication