# Sindhi Match Making

A full-stack matrimonial application, organized so the frontend and backend can be run and deployed independently.

## Repository layout

- `frontend/` — Next.js 15 web application.
- `backend/` — dependency-free Node.js REST API and local data layer.

## Run locally

Start the API in one terminal:

```bash
cd backend
npm run dev
```

Then start the web app in another terminal:

```bash
cd frontend
npm install
npm run dev
```

The API runs at `http://localhost:4000`. It creates `backend/data/database.json` on first launch. This local database is intentionally ignored by Git; delete it to reset the demo data.

## Frontend architecture

- `frontend/src/services/` holds the Axios client and frontend API services.
- `frontend/src/app/` contains App Router pages; presentation components are in `frontend/src/components/`.
- Zustand keeps UI state, while TanStack Query loads API data.

For deployment, run `backend/` on a server, use a managed database, and set `NEXT_PUBLIC_API_URL` for the frontend.
