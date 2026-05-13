# DATN-JPMaster Project Overview

This file is a quick orientation guide for future AI assistants and contributors. It summarizes the workspace structure, the purpose of each app, the main entry points, and the conventions that matter when making changes.

## 1. Workspace Summary

`DATN-JPMaster` is a pnpm monorepo for an e-learning platform focused on Japanese study content.

- `apps/frontend` is the React/Vite client.
- `apps/backend` is the Express/PostgreSQL API.
- The repo uses TypeScript across both apps.
- The workspace is configured through `pnpm-workspace.yaml`.

## 2. Frontend Overview

Path: `apps/frontend`

### Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Router

### Main Entry Points

- `src/main.tsx` bootstraps React, loads the Google Sign-In script, and mounts the app.
- `src/App.tsx` defines the router and top-level providers.

### Routing Surface

The app routes through `App.tsx` to these pages:

- `Homepage`
- `CourseList`
- `CourseDetail`
- `Lesson`
- `Flashcard`
- `FlashcardDetail`
- `BlogList`
- `BlogDetail`
- `TestList`
- `Login`
- `Signup`

### Frontend Folder Structure

- `src/components`
  - Shared UI, layout, form, and card components.
  - `src/components/ui` contains the reusable design system primitives such as `Card`, `Badge`, `Section`, `Container`, `ImageCard`, `LevelBadge`, `StatusBadge`, `CategoryBadge`, `ProgressBar`, `AvatarGroup`, `SectionHeader`, `StarRating`, and related components.
  - `src/components/cards` contains content cards used by multiple pages: blog cards, course cards, test cards, and testimonial cards.
  - `src/components/sections` contains page sections like hero, courses, blog filters, testimonials, and newsletter blocks.
- `src/contexts`
  - Application state providers such as auth and toast state.
- `src/hooks`
  - Reusable hooks for forms, Google script loading, and toast message handling.
- `src/pages`
  - Route-level pages and their exports.
- `src/services`
  - API clients and Google auth helpers.
- `src/styles`
  - Tailwind utility extensions and shared CSS helpers.
- `src/utils`
  - Validation helpers and small shared utilities.

### Frontend Conventions

- Prefer component reuse through the barrel exports in `src/components` and `src/components/cards`.
- `ImageCard` is the shared image wrapper; it accepts only its defined prop variants, so avoid inventing new prop values.
- Keep routing changes in sync between `src/App.tsx` and the page files.
- Run frontend commands from `apps/frontend`, not the repo root.

### Frontend Scripts

- `pnpm dev` starts Vite.
- `pnpm build` runs TypeScript build checks and produces the Vite production build.
- `pnpm lint` runs ESLint.
- `pnpm preview` previews the production build.

## 3. Backend Overview

Path: `apps/backend`

### Stack

- Express 5
- PostgreSQL via `pg`
- dotenv for environment variables
- cors for cross-origin requests
- bcryptjs for password hashing

### Main Entry Points

- `src/app.ts` creates the Express app, registers middleware and routes, and starts the HTTP server.
- `src/config/database.ts` creates the PostgreSQL connection pool.

### Backend Folder Structure

- `src/controllers`
  - Request handlers for domain operations.
- `src/routes`
  - Route definitions for users, courses, and flashcards.
- `src/models`
  - Data access and entity-level logic.
- `src/services`
  - Shared business logic such as database and password helpers.
- `src/middlewares`
  - Error handling and other request pipeline middleware.

### Backend Runtime Behavior

- `app.ts` exposes a basic health response at `/`.
- API routes are mounted under `/api/users`, `/api/courses`, and `/api/flashcards`.
- The server checks database connectivity on startup.

### Backend Scripts

- `pnpm dev` runs the app with nodemon and `ts-node/esm`.
- `pnpm build` compiles TypeScript.
- `pnpm start` runs the compiled server from `dist/app.js`.
- `pnpm lint` runs ESLint.
- `pnpm format` formats the backend files with Prettier.

### Backend Conventions

- Environment variables are loaded with dotenv.
- Database config lives in `src/config/database.ts`.
- Keep route registration in `src/app.ts` aligned with the controller and route files.

## 4. Important Notes For Future Changes

- If a build fails, check for strict TypeScript issues first, especially unused imports/locals and invalid component prop values.
- The frontend previously had a duplicate `HeroSection` implementation and a few invalid `ImageCard` prop usages; those are the kind of regressions this overview is meant to help avoid.
- If you add a new page, update the route list in `src/App.tsx` and the relevant barrel exports.
- If you add a new reusable UI element, export it through the appropriate barrel file so other components can import it consistently.

## 5. Quick Navigation Map

- App shell: `apps/frontend/src/App.tsx`
- Frontend bootstrap: `apps/frontend/src/main.tsx`
- Frontend shared UI: `apps/frontend/src/components/ui`
- Frontend cards: `apps/frontend/src/components/cards`
- Frontend pages: `apps/frontend/src/pages`
- Frontend services: `apps/frontend/src/services`
- Backend server: `apps/backend/src/app.ts`
- Backend database: `apps/backend/src/config/database.ts`
- Backend routes: `apps/backend/src/routes`
- Backend controllers: `apps/backend/src/controllers`

## 6. Suggested First Reads

If you are an AI agent working here for the first time, read these files first:

1. `apps/frontend/src/App.tsx`
2. `apps/frontend/src/components/index.ts`
3. `apps/frontend/src/components/cards/index.ts`
4. `apps/backend/src/app.ts`
5. `apps/backend/src/config/database.ts`
