# 📝 Notes & Bookmarks Manager - Backend API

RESTful API for managing personal notes and bookmarks with optional user authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas account

### Installation

1. **Install dependencies**
```bash
   npm install
```

2. **Configure environment variables**
```bash
   cp .env.example .env
```
   
   Edit `.env` and set:
```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
```

3. **Start MongoDB** (if running locally)
```bash
   mongod
```

4. **Run the server**
```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (Bonus Feature)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

### Notes API

#### Get All Notes
```http
GET /api/notes
GET /api/notes?q=search-term
GET /api/notes?tags=work,important
GET /api/notes?q=meeting&tags=work
```

#### Get Single Note
```http
GET /api/notes/:id
```

#### Create Note
```http
POST /api/notes
Content-Type: application/json

{
  "title": "Meeting Notes",
  "content": "Discussed project timeline...",
  "tags": ["work", "important"],
  "isFavorite": false
}
```

#### Update Note
```http
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["work"],
  "isFavorite": true
}
```

#### Delete Note
```http
DELETE /api/notes/:id
```

### Bookmarks API

#### Get All Bookmarks
```http
GET /api/bookmarks
GET /api/bookmarks?q=search-term
GET /api/bookmarks?tags=tech,tutorial
```

#### Get Single Bookmark
```http
GET /api/bookmarks/:id
```

#### Create Bookmark
```http
POST /api/bookmarks
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Example Site",
  "description": "A helpful resource",
  "tags": ["tech", "resource"],
  "isFavorite": false
}
```

**Bonus**: Leave `title` empty and it will auto-fetch from the URL!
```json
{
  "url": "https://github.com",
  "tags": ["dev"]
}
```

#### Update Bookmark
```http
PUT /api/bookmarks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "isFavorite": true
}
```

#### Delete Bookmark
```http
DELETE /api/bookmarks/:id
```

## 🔐 Authentication (Optional)

To use protected routes, include JWT token in Authorization header:
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The API works **with or without** authentication:
- **Without auth**: All notes/bookmarks are public
- **With auth**: Users only see their own data

## 📦 Response Format

### Success Response
```json
{
  "status": "success",
  "data": {
    "notes": [...]
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error description"
}
```

## 🧪 Testing with cURL

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Note",
    "content": "This is a test",
    "tags": ["test"]
  }'
```

### Get All Notes
```bash
curl http://localhost:5000/api/notes
```

### Search Notes
```bash
curl "http://localhost:5000/api/notes?q=test&tags=important"
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **URL Scraping**: axios + cheerio

## 📁 Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Note.js
│   │   ├── Bookmark.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── noteController.js
│   │   ├── bookmarkController.js
│   │   └── authController.js
│   ├── routes/
│   │   ├── noteRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   └── authRoutes.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── urlMetadata.js
│   │   └── validators.js
│   └── app.js
├── .env
├── server.js
└── package.json
```

## ✨ Bonus Features Implemented

✅ Auto-fetch URL title for bookmarks  
✅ JWT authentication  
✅ User-specific data filtering  
✅ Mark favorites  
✅ Advanced search with tags  
✅ Comprehensive validation  

## 🐛 Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Database errors
- Authentication errors
- Invalid URLs
- Missing resources (404)

## 📝 Notes

- MongoDB must be running before starting the server
- Default port is 5000 (configurable in .env)
- JWT tokens expire in 30 days
- All timestamps are automatically managed

## 🤝 Support

For issues or questions, please check the error messages in the response or server logs.