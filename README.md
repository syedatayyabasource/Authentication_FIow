# Week 2 — Full Stack Authentication Flow

A complete authentication assignment with a separate React frontend and Node/Express backend.

## Features

- Professional Login and Create Account pages
- Client-side validation without blank-screen failures
- Server-side validation
- Password hashing with bcrypt
- JWT authentication
- Protected Dashboard
- Authenticated `/me` request
- Logout and token clearing
- Any NEW email can create its own account
- Existing accounts can sign in with their own password
- Clear error messages for wrong credentials or duplicate accounts
- SQLite local database
- Responsive UI

## Run

### Terminal 1 — backend

```bash
cd backend
npm install
npm run dev
```

Backend:
`http://localhost:5000`

Health check:
`http://localhost:5000/api/health`

### Terminal 2 — frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:
`http://localhost:5173/login`

## Important

A new email must first be registered through **Create account**. The system does not pretend that an unregistered email is an existing user. This keeps the assignment's real-account requirement intact.

If an email already exists, Create account shows a clear message. If login credentials are wrong, Login shows a clear message instead of leaving the page blank.
