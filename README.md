# Student Attendance and Marks Tracker

A modern student dashboard built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JavaScript.

## Requirements

- Node.js 18+
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- VS Code

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux, use `cp .env.example .env` instead of `copy`.

Open http://localhost:5000.

The app creates the database and collections automatically when data is first saved. Use **Add student** to start.

## MongoDB connection

The default connection is `mongodb://127.0.0.1:27017/student_tracker`. To use Atlas, replace `MONGO_URI` in `.env` with your connection string.
