# 🏄‍♂️ Surfer - Video Downloader

A modern, fast, and free video downloader that supports YouTube, Twitter, Instagram, TikTok, and more platforms.

## ✨ Features

- **Multi-Platform Support**: Download from YouTube, Twitter, Instagram, TikTok, Facebook, and more
- **Format Selection**: Choose from multiple quality options and formats
- **Fast Downloads**: Optimized for speed with yt-dlp
- **No Registration**: Completely free, no signup required
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Progress**: See download status and recent downloads

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- yt-dlp (installed automatically in production)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Surfer
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Start development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

4. **Access the app**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🏗️ Architecture

```
Surfer/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
├── backend/           # Node.js + Express
│   ├── src/
│   │   └── app.js
│   └── package.json
└── README.md
```

## 🚀 Deployment

### Option 1: Vercel + Railway (Recommended)

**Frontend (Vercel):**
1. Push code to GitHub
2. Connect repo to Vercel
3. Set build command: `cd frontend && npm run build`
4. Set output directory: `frontend/dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.railway.app`

**Backend (Railway):**
1. Connect GitHub repo to Railway
2. Railway auto-detects Node.js
3. Add environment variables:
   - `PORT=5000`
   - `NODE_ENV=production`
4. Deploy automatically

### Option 2: All-in-One Railway

Deploy both frontend and backend on Railway:
1. Connect repo to Railway
2. Create two services (frontend/backend)
3. Configure build commands and environment variables

## 🔧 Configuration

### Environment Variables

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-url.railway.app
```

**Backend:**
```env
PORT=5000
NODE_ENV=production
```

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/formats?url=<url>` - Get available formats
- `POST /api/download` - Download video
- `GET /api/download/:id` - Download file
- `GET /api/recent` - Recent downloads

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Start development server
npm start        # Start production server
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Adding New Features

1. **Backend API**: Add routes in `backend/src/app.js`
2. **Frontend Components**: Create in `frontend/src/components/`
3. **Styling**: Use Tailwind CSS classes
4. **State Management**: Use React Context in `frontend/src/context/`

## 🔒 Security

- CORS configured for production domains
- Rate limiting recommended for production
- File cleanup implemented
- No sensitive data stored

## 📊 Monitoring

- Health check endpoint: `/api/health`
- Railway/Vercel built-in monitoring
- Automatic scaling based on usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the deployment logs
2. Test API endpoints manually
3. Verify environment variables
4. Check file permissions

---

**Happy downloading! 🎥✨** 