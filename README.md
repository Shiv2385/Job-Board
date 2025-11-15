# Job Board MERN Project

A full-stack job board web application built with **MERN stack** (MongoDB, Express, React optional, Node.js). Users can view, post, edit, and delete jobs. Authentication is implemented, and frontend + backend are deployed together.

---

## Features

- User registration and login with JWT authentication
- Post a new job (only for logged-in users)
- View all jobs with filters (title, company, location)
- Edit or delete jobs (only by the user who posted them)
- Responsive design with CSS
- Frontend served through backend (no separate server needed)
- Deployable on Render

---

## Local Setup

### 1. Clone the repository
```
git clone https://github.com/Shiv2385/Job-Board.git
```
```
cd job-board/backend
```
2. Install dependencies
```
npm install
```
4. Setup environment variables

Create a .env file in backend/ with:
```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES=7d
PORT=5000
```
4. Run the server
```
npm start
```