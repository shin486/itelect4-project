# ITELECT4 Frontend

ITELECT4 Graded Task 4 (GT4) — Fullstack MERN application frontend built with React, TypeScript, Vite, Tailwind CSS, and Shadcn UI.

## 🔗 Live URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://itelect4-project-nine.vercel.app |
| **Backend API** | https://itelect4-backend-tau.vercel.app |



## 📋 Features

- User registration & login with JWT authentication
- Protected routes
- React Hook Form + Zod validation
- TanStack Query for server state
- Zustand for client state
- Tailwind CSS + Shadcn UI components
- React Router for navigation

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Shadcn UI
- **Forms:** React Hook Form + Zod
- **State:** Zustand + TanStack Query
- **Routing:** React Router

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your backend API URL:
# VITE_API_URL=https://itelect4-backend-tau.vercel.app

# Run development server
npm run dev
```

## 🌍 Deployment (Vercel)

1. Connect this repo to Vercel
2. Add environment variable:
   - `VITE_API_URL` — `https://itelect4-backend-tau.vercel.app`
3. Deploy

## 🔗 Backend Repo

[ITELECT4 Backend](https://github.com/shin486/itelect4-backend)
