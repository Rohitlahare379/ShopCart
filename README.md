# ShopCart 🛒

A full-stack e-commerce web application built with Express, MongoDB, and React (Vite).

## Project Structure

```text
ShopCart/
├── backend/       # Express API server & MongoDB models
└── frontend/      # React + Vite application
```

## Features

- **Frontend**: Product browsing, category filtering, search, cart management, and interactive UI built with React and Vite.
- **Backend**: RESTful API endpoints for products, authentication, orders, and user management.
- **Database**: MongoDB with Mongoose schemas and seed scripts.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas connection)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Configure your `PORT`, `MONGODB_URI`, and `JWT_SECRET`.
4. (Optional) Seed the database with sample products:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   node index.js
   # or with nodemon:
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
