# How to Deploy Pekonecta to Render.com (Free)

This guide explains how to deploy your full-stack application (React + Node + SQLite) to Render.com for free.

## Prerequisites
1.  **GitHub Account**: You need to push this code to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).

## Step 1: Push to GitHub
If you haven't already, initialize a git repo and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
# Create a repo on GitHub and follow instructions to push, e.g.:
# git remote add origin https://github.com/YOUR_USER/pekonecta.git
# git push -u origin main
```

## Step 2: Create a Web Service on Render
1.  Go to the [Render Dashboard](https://dashboard.render.com).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `pekonecta-demo` (or similar)
    *   **Region**: Closest to you (e.g., Frankfurt, Oregon)
    *   **Branch**: `main`
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build && npx prisma generate`
        *   *This installs deps, builds the React frontend, and generates the Prisma client.*
    *   **Start Command**: `npm start`
        *   *This runs `node server/index.js`, which serves both the API and the React files.*
    *   **Instance Type**: Free

## Step 3: Environment Variables
Scroll down to "Environment Variables" and add these if needed. For SQLite, `DATABASE_URL` is usually local, but for the build to work, you might need to ensure Prisma can run.
*   **Key**: `DATABASE_URL`
*   **Value**: `file:./dev.db`

## Step 4: Deploy
Click **Create Web Service**. Render will clone your repo, install dependencies, build the frontend, and start the server.

> [!WARNING]
> **Important Note about SQLite on Render Free Tier**
> Render's free Web Services have an **ephemeral filesystem**. This means every time you deploy or the service restarts (which happens automatically on the free tier), **your database data will be reset** to the initial state (or empty).
>
> For a persistent demo:
> 1.  Use **Render Disk** (Paid feature).
> 2.  Or switch `provider` in `schema.prisma` to `postgresql` and use a free Postgres database (e.g., Render Postgres, Neon, or Supabase).

## Optional: Seeding Data on Deploy
If you want the app to always start with some data (since the DB wipes on restart), update your Start Command to:
```bash
npx prisma migrate dev --name init && node prisma/seed.js && npm start
```
*Note: This might extend startup time.*
