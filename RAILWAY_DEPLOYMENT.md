# Railway Deployment Guide

This project is deployed to Railway as 4 services in one Railway project:
- `mysql` (Railway MySQL plugin)
- `ml-service` (Flask model API)
- `backend` (Spring Boot API)
- `frontend` (React + Nginx)

## 1. Create Railway Project
1. Create a new project in Railway.
2. Add the `MySQL` plugin service.

## 2. Deploy `ml-service`
1. Add a new service from your GitHub repo.
2. Use Dockerfile: `deployment/docker/Dockerfile_ml`.
3. Keep default start command from Dockerfile.
4. Deploy once and copy the public URL, for example:
   `https://ml-service-production.up.railway.app`

## 3. Deploy `backend`
1. Add another service from the same repo.
2. Use Dockerfile: `deployment/docker/Dockerfile_backend`.
3. Set environment variables on this backend service:
   - `SPRING_DATASOURCE_URL=jdbc:mysql://<MYSQL_HOST>:<MYSQL_PORT>/<MYSQL_DB>?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`
   - `SPRING_DATASOURCE_USERNAME=<MYSQL_USER>`
   - `SPRING_DATASOURCE_PASSWORD=<MYSQL_PASSWORD>`
   - `ML_API_URL=https://<YOUR_ML_SERVICE_DOMAIN>/predict`
   - `CORS_ALLOWED_ORIGIN_PATTERNS=https://<YOUR_FRONTEND_DOMAIN>,http://localhost:5173,http://127.0.0.1:*`
4. Deploy and copy backend public URL.

Note:
- Railway injects `PORT`; backend now binds to it automatically.

## 4. Deploy `frontend`
1. Add another service from the same repo.
2. Use Dockerfile: `deployment/docker/Dockerfile_frontend`.
3. Set:
   - `VITE_API_BASE_URL=https://<YOUR_BACKEND_DOMAIN>`
4. Redeploy frontend after setting `VITE_API_BASE_URL` (it is used at build time).
5. Copy frontend public URL.

Note:
- Frontend container now maps Nginx to Railway `PORT`.

## 5. Final Wiring
1. Update backend `CORS_ALLOWED_ORIGIN_PATTERNS` to include the exact frontend domain.
2. Redeploy backend.
3. Open frontend URL and test:
   - login/signup
   - eligibility check
   - admin/officer APIs

## 6. Optional: Run DB SQL Seed
Use Railway MySQL connect details and run SQL files from `database/`:
- `users.sql`
- `scheme.sql`
- `scheme_details.sql`
- `applications.sql`
- `eligibility_history.sql`

## 7. GitHub Actions Auto Deploy
This repo includes workflow:
- `.github/workflows/ci-cd.yml`

It:
- builds backend + frontend
- builds all Docker images
- deploys backend, frontend, and ML to Railway on every push to `main`

Add these GitHub repository secrets:
- `RAILWAY_TOKEN`
- `RAILWAY_PROJECT_ID`
- `RAILWAY_ENVIRONMENT` (example: `production`)
- `RAILWAY_SERVICE_BACKEND`
- `RAILWAY_SERVICE_FRONTEND`
- `RAILWAY_SERVICE_ML`

How to get IDs:
1. Install Railway CLI locally.
2. Run `railway login`.
3. Run `railway project` to pick the project.
4. Run `railway status` and copy project/service/environment IDs.
