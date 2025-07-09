# 💬 Chat App

A modern, full-stack real-time chat application with user authentication, profile management, image uploads, and beautiful theming. Built with React, Vite, Zustand, Tailwind CSS, Express, MongoDB, Socket.io, and Cloudinary.

---

## 🚀 Features

- **Real-time Messaging:** Instant chat with Socket.io
- **User Authentication:** Secure signup, login, JWT-based sessions
- **Profile Management:** Update profile picture (Cloudinary integration)
- **Responsive UI:** Mobile-friendly, modern design with Tailwind CSS & DaisyUI
- **Theming:** 30+ beautiful themes, live preview in settings
- **Image Sharing:** Send images in chat
- **Online Status:** See who’s online in real time
- **Loading Skeletons:** Smooth UX with animated placeholders

---

## 🛠️ Tech Stack

**Frontend:**

- React 18 + Vite
- Zustand (state management)
- React Router
- Tailwind CSS + DaisyUI
- Axios
- Socket.io-client

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT (auth)
- Cloudinary (image uploads)
- CORS, Cookie-Parser, Dotenv

---

## 📁 Folder Structure

```
CHAT-APP/
├── frontend/
│   ├── src/
│   │   ├── components/         # UI components (Sidebar, Chat, Header, etc.)
│   │   ├── pages/              # Main pages (Home, Login, Signup, Profile, Settings)
│   │   ├── constants/          # App-wide constants (themes)
│   │   ├── assets/             # Static assets
│   │   ├── lib/                # Axios instance, utilities
│   │   └── store/              # Zustand stores (auth, chat, theme)
│   ├── public/                 # Public assets (avatar, icons)
│   ├── tailwind.config.js      # Tailwind/DaisyUI config
│   └── ...
├── backend/
│   ├── src/
│   │   └── index.js            # Server entry point
│   ├── controllers/            # Auth & message controllers
│   ├── models/                 # Mongoose models (User, Message)
│   ├── routes/                 # Express routes (auth, message)
│   ├── middleware/             # Auth middleware
│   ├── database/               # DB connection, socket, utils, cloudinary
│   └── ...
└── README.md
```

---

## ⚡ Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-username/CHAT-APP.git
cd CHAT-APP
```

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file with:
# PORT=5001
# MONGODB_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

---

## 🔑 Environment Variables

**Backend (.env):**

- `PORT` - Server port (default: 5001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials

---

## 🧩 API & Socket Overview

### REST API (Backend)

- `POST   /signup` - Register new user
- `POST   /login` - Login user
- `POST   /logout` - Logout user
- `PUT    /update-pfp` - Update profile picture
- `GET    /check` - Check auth (JWT)
- `GET    /users` - Get all users (except self)
- `GET    /:id` - Get messages with user `:id`
- `POST   /send/:id` - Send message to user `:id`

### Socket.io Events

- `connection` - User connects (with userId)
- `getOnlineUsers` - Receive array of online user IDs
- `newMessage` - Receive new message in real time

---

## 🎨 Theming

- 30+ themes powered by DaisyUI
- Change theme in Settings page (live preview)

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Credits

- [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/), [Socket.io](https://socket.io/), [Cloudinary](https://cloudinary.com/)

---

> Made with ❤️ by Rajan Jha
