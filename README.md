# PostIt

A full-stack social media platform built with the MERN stack, designed for Pakistani audiences.

## Features

- User Authentication (Register/Login)
- Create, view, and delete posts (280 character limit)
- Like posts
- Follow/Unfollow users
- Timeline feed (posts from users you follow + your own posts)
- User profiles with bio and profile pictures
- Image uploads for posts and profiles

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)

### Frontend
- React 18
- Vite
- React Router
- Axios
- TailwindCSS

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/postit
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `POST /api/posts` - Create a post (protected)
- `GET /api/posts` - Get timeline (protected)
- `GET /api/posts/:postId` - Get single post
- `DELETE /api/posts/:postId` - Delete post (protected)
- `POST /api/posts/:postId/like` - Like/unlike post (protected)

### Users
- `GET /api/users/:userId` - Get user profile
- `GET /api/users/:userId/posts` - Get user's posts
- `PUT /api/users/:userId` - Update user profile (protected)

### Follows
- `POST /api/follows/:userId` - Follow/unfollow user (protected)
- `GET /api/follows/:userId/followers` - Get user's followers
- `GET /api/follows/:userId/following` - Get user's following

## Project Structure

```
post-it/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth and upload middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
├── frontend/
│   └── src/
│       ├── components/  # React components
│       ├── pages/       # Page components
│       ├── context/    # React context
│       ├── services/    # API services
│       └── utils/       # Utility functions
```

## Usage

1. Start MongoDB (if using local instance)
2. Start the backend server (`cd backend && npm run dev`)
3. Start the frontend server (`cd frontend && npm run dev`)
4. Open `http://localhost:5173` in your browser
5. Register a new account or login
6. Start creating posts and following users!

## Notes

- Image uploads are stored in `backend/uploads/`
- JWT tokens are stored in localStorage
- Posts are limited to 280 characters
- Profile pictures and post images have a 5MB size limit

## Future Enhancements

- Real-time notifications
- Search functionality
- Comments/replies
- Retweets
- Hashtags and mentions
- Direct messages
- Email verification

