# E-Learning Backend API

Simple and clean Express.js backend for an e-learning platform with User CRUD operations.

## Project Structure

```
apps/backend/
├── src/
│   ├── config/
│   │   └── database.ts           # PostgreSQL connection pool
│   ├── controllers/
│   │   └── user.controller.ts    # User request handlers
│   ├── models/
│   │   └── user.model.ts         # User database operations
│   ├── routes/
│   │   └── user.routes.ts        # User API routes
│   ├── services/
│   │   ├── database.service.ts   # Database query executor
│   │   └── password.service.ts   # Password hashing & verification
│   ├── middlewares/
│   │   └── error.middleware.ts   # Error handling
│   └── app.ts                    # Express app setup
├── .env                          # Environment configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

## Setup

1. Install dependencies:
```bash
cd apps/backend
pnpm install
```

2. Create `.env` file with PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=DATN_JPMaster
PORT=5000
```

3. Start development server:
```bash
pnpm dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Features

- Express.js with TypeScript
- PostgreSQL with connection pooling
- Password hashing with bcryptjs
- Input validation and error handling
- Centralized error middleware
- Role-based access (guest, learner, admin)
- Async/await for all operations

## Development

```bash
pnpm dev      # Start development server
pnpm build    # Build TypeScript
pnpm lint     # Run ESLint
pnpm format   # Format code with Prettier
```
