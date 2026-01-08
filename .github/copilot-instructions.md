<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Project snapshot — Sousse Apple Store (MERN)

This repository is a small MERN stack app with a Vite + React frontend and an Express + MongoDB backend.

- Backend: `server/` — ES modules, Express routes, Mongoose models, JWT auth middleware.
- Frontend: `client/` — Vite + React (hooks + context), Tailwind for styling, Axios for API calls.

Keep changes minimal and consistent with existing patterns (ES modules, JSON APIs, localStorage tokens).

Key files to inspect before editing code

- Backend entry: `server/server.js` (connects to MongoDB using `process.env.MONGO_URI`, mounts routes)
- Backend scripts: `server/package.json` (`dev` uses `nodemon server.js`, `seed` runs `seeder.js`)
- Auth middleware: `server/middleware/authMiddleware.js` (exports `protect` and `admin`) — required for private/admin routes
- Routes: `server/routes/productRoutes.js`, `server/routes/userRoutes.js` (CRUD & auth endpoints)
- Models: `server/models/Product.js`, `server/models/User.js` (schema shapes + `matchPassword` method)
- Seeder: `server/seeder.js` (creates admin user and products)
- Frontend entry: `client/src/main.jsx` (wraps `App` with `AuthProvider` and `CartProvider`)
- Frontend auth: `client/src/context/AuthContext.jsx` (stores `token` & `user` in `localStorage`, sets Axios `Authorization` header)
- Cart logic: `client/src/context/CartContext.jsx` (persists `cartItems` to `localStorage`)
- Admin UI: `client/src/pages/admin/*` and `client/src/components/ProductForm.jsx` (uses same API shape as server)

Important architecture & conventions (do not break these without updating both sides)

- ES module style everywhere: use `import` / `export` and ensure `package.json` has `"type": "module"` where needed.
- API base URLs are hard-coded in the client as `http://localhost:5000/api/...` in many places. If you rename or add a proxy, update all frontend calls or centralize them.
- Auth pattern: login/register endpoints return `{ token, _id, name, email, isAdmin }`. The frontend stores `token` and sets `axios.defaults.headers.common['Authorization'] = 'Bearer <token>'` in `AuthContext.jsx`.
- Admin routes require `Authorization: Bearer <token>` and the `admin` middleware (server checks `req.user.isAdmin`).
- DB seeding: `server/seeder.js` creates an admin with password `123456` and sample products. Use `cd server && npm run seed`.

Developer workflows (commands)

- Start backend in dev: `cd server; npm run dev` (nodemon)
- Seed database: `cd server; npm run seed` (runs `seeder.js` — will `process.exit` on completion)
- Start frontend: `cd client; npm run dev` (Vite default at `http://localhost:5173`)
- Build frontend: `cd client; npm run build`

Common failure modes & what to check

- Missing or invalid `server/.env` (`MONGO_URI`, `JWT_SECRET`) — server will exit or throw connection/auth errors.
- CORS: server explicitly allows `http://localhost:5173` and `credentials: true`. If you change frontend port, update `server/server.js` CORS origin.
- Token not attached: frontend sets Authorization header on login/load. If you modify auth flows, ensure `AuthContext` still sets the header and localStorage keys remain `token` and `user`.
- Numeric fields: `ProductForm.jsx` sends `price` as Number and `countInStock` as Number (it parses strings). Ensure server model types match.

When making changes

- Update both client and server when changing the API contract (endpoints, request/response fields).
- Preserve ES module exports/imports; match existing coding style and naming (e.g., `protect`, `admin`, route base paths `/api/products` & `/api/users`).
- For new env vars, add them to `server/.env` locally and document them in this file; do not commit secrets.
- When adding admin-only features, reuse `protect` + `admin` middleware in server and check `user.isAdmin` client-side in `AuthContext`/pages.

Examples (copy-paste friendly)

- Get all products (frontend): `axios.get('http://localhost:5000/api/products')` — used in `client/src/pages/HomePage.jsx`.
- Create product (admin): `axios.post('http://localhost:5000/api/products', productData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })` — used in `ProductForm.jsx`.
- Login (returns token): `POST http://localhost:5000/api/users/login` — implemented in `server/routes/userRoutes.js`.

Notes for AI agents

- Keep edits atomic and minimal; run `server` and `client` locally to validate behavior where possible.
- If you modify models or API shapes, update the seeder and all frontend callers (`client/src/**`) and tests (if any).
- Do not leak secrets into commits. If you need to demonstrate behavior without real credentials, mock calls or use an in-memory MongoDB in tests.

If anything here is unclear or you want more detail on a particular area (auth, seeding, specific routes), tell me which part and I'll expand with concrete examples.
