# InternSathi Job Application Tracker

A beginner-friendly full-stack web application to track job applications.

## Project Overview
This project uses:
- **Frontend**: React (Vite) + Tailwind CSS (v4)
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL with Prisma ORM

## Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running locally

## Installation Steps

### 1. Database Setup
Create a PostgreSQL database named `job_tracker`. The default configuration uses the credentials:
- Username: `postgres`
- Password: `postgres`
- Port: `5432`

If your credentials are different, update the `.env` file in the `server` directory.

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Push the Prisma schema to your database (this creates the tables):
   ```bash
   npx prisma db push
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## API Endpoints
All endpoints are prefixed with `http://localhost:5000/applications`

- `GET /applications` - Get all applications (supports `page`, `limit`, `search`, `status` query params)
- `GET /applications/:id` - Get a single application by ID
- `POST /applications` - Create a new application
- `PATCH /applications/:id` - Update an application
- `DELETE /applications/:id` - Delete an application
