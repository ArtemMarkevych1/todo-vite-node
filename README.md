# Vite + Node.js Application

A full-stack application built with Vite for the frontend and Node.js for the backend.

## 🚀 Features

- Modern frontend with Vite
- Node.js backend with Express
- MongoDB database integration
- Environment configuration for development and production
- Ready for deployment on Netlify (frontend) and other platforms (backend)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (for local development)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
2. Install dependencies:
3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Update the variables according to your setup

## 💻 Development

1. Start the backend server:
2. Start the frontend development server:


## 🚀 Deployment

### Frontend (Netlify)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Backend
1. Set up MongoDB Atlas
2. Deploy to your preferred hosting service (Render, Railway, etc.)
3. Configure environment variables on your hosting platform

## 📁 Project Structure

├── client/ # Frontend source files
├── server/ # Backend source files
├── netlify.toml # Netlify configuration

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Me!

## 🙏 Acknowledgments

- Vite.js team for the amazing build tool
- Node.js community
- MongoDB team
