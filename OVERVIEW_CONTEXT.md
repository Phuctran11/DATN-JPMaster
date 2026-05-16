# AI Context for DATN-JPMaster

This file is a compact orientation guide for future AI assistants. Read this first to understand the codebase, the current implementation style, and the important constraints that repeatedly matter in this repo.

## 1. Workspace Summary

`DATN-JPMaster` is a pnpm monorepo for an e-learning platform focused on Japanese study content.

- `apps/frontend` is the React/Vite client.
- `apps/backend` is the Express/PostgreSQL API.
- The repo uses TypeScript across both apps.
- Workspace layout is controlled by `pnpm-workspace.yaml`.

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

### Route Surface

Main pages currently include:

- `Homepage`
- `CourseList`
- `CourseDetail`
- `CourseExplore`
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
  - `src/components/ui` contains reusable design-system primitives like `Card`, `Section`, `Container`, `ImageCard`, `ProgressBar`, `SectionHeader`, `Badge` variants, and related building blocks.
  - `src/components/cards` contains cards reused across multiple pages: blog, course, test, testimonial, and learning cards.
  - `src/components/sections` contains page sections like hero, featured courses, blog blocks, and newsletter content.
- `src/contexts`
  - Auth and toast state providers.
- `src/hooks`
  - Reusable hooks for forms, Google script loading, and toast messages.
- `src/pages`
  - Route-level pages.
- `src/services`
  - API clients and Google auth helpers.
- `src/styles`
  - Tailwind utility extensions and shared CSS helpers.
- `src/utils`
  - Small shared utilities and calculations.

### Frontend Conventions

- Prefer component reuse through barrel exports in `src/components` and `src/components/cards`.
- `ImageCard` is the shared image wrapper; only use supported props and avoid inventing new variants.
- Keep routing changes in sync between `src/App.tsx` and page files.
- Keep UI data-driven. Avoid default mock content in reusable course cards when the database/API should provide the values.
- When a component needs repeated styling logic, extract a small local helper instead of duplicating class strings in multiple places.
- Run frontend commands from `apps/frontend`, not the repo root.

### Frontend Scripts

- `pnpm dev` starts Vite.
- `pnpm build` runs the TypeScript build and the Vite production build.
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
  - Route definitions for users, courses, lessons, flashcards, purchases, ratings, and related modules.
- `src/models`
  - Data access and entity-level logic.
- `src/services`
  - Shared business logic such as database, token, and password helpers.
- `src/middlewares`
  - Error handling and request pipeline middleware.

### Backend Runtime Behavior

- `app.ts` exposes a basic health response at `/`.
- API routes are mounted under `/api/...`.
- The server checks database connectivity on startup.

### Backend Scripts

- `pnpm dev` runs the app with nodemon and `ts-node/esm`.
- `pnpm build` compiles TypeScript.
- `pnpm start` runs the compiled server from `dist/app.js`.
- `pnpm lint` runs ESLint.
- `pnpm format` formats backend files with Prettier.

### Backend Conventions

- Environment variables are loaded with dotenv.
- Database config lives in `src/config/database.ts`.
- Keep route registration in `src/app.ts` aligned with controllers and route files.
- Prefer API shaping close to the database model instead of hardcoding view-only fallback values in the frontend.

## 4. Current Product/Code Notes

These are the kinds of details that matter when making future changes.

### Course UI

- `src/components/cards/CourseCard.tsx` holds the shared course card implementations.
- `FeaturedCourseCard` is used as the top recommendation / featured layout.
- `CourseGridCard` is used for the regular grid cards.
- The featured course card currently uses a large split layout with image on the left and content on the right.
- The featured card should stay responsive and should not rely on default mock course text when real course data is available.
- Badge styling for Free/Paid should remain consistent across course surfaces.

### Header Search

- The header search was split into smaller components for maintainability.
- Search is currently client-side and filters course titles.
- Search results are rendered in a dropdown anchored under the search bar.
- If the course count grows, consider moving search server-side.

### Homepage Courses Section

- The homepage course section reuses shared course card components.
- The featured course in the section uses the shared featured card and should show the course image.
- Free/Paid tag design should stay aligned with the explore page card design.

### Lesson Content Page

- The lesson model has been updated so lesson type no longer includes `flashcard`.
- The lesson content page should render the lesson text content from the database.
- If a lesson has a video link, render the video for the user.
- A YouTube link is acceptable for user viewing if it is an embeddable link, and the frontend should use a responsive embed layout.
- If a lesson has no video, the page should still render the text content cleanly.

## 5. Validation and Debugging Rules

- If a build fails, check TypeScript issues first, especially unused imports/locals and invalid component props.
- Prefer minimal, local fixes rather than broad refactors unless the change truly requires it.
- When updating shared card components, verify every call site passes the new required props.
- After edits, run a narrow diagnostic or build check when possible.

## 6. Quick Navigation Map

- Frontend app shell: `apps/frontend/src/App.tsx`
- Frontend bootstrap: `apps/frontend/src/main.tsx`
- Frontend shared UI: `apps/frontend/src/components/ui`
- Frontend cards: `apps/frontend/src/components/cards`
- Frontend pages: `apps/frontend/src/pages`
- Frontend services: `apps/frontend/src/services`
- Backend server: `apps/backend/src/app.ts`
- Backend database: `apps/backend/src/config/database.ts`
- Backend routes: `apps/backend/src/routes`
- Backend controllers: `apps/backend/src/controllers`

## 7. Suggested First Reads

If you are an AI agent working here for the first time, read these files first:

1. `AI_CONTEXT.md`
2. `apps/frontend/src/App.tsx`
3. `apps/frontend/src/components/index.ts`
4. `apps/frontend/src/components/cards/index.ts`
5. `apps/backend/src/app.ts`
6. `apps/backend/src/config/database.ts`

## 8. Notes For Future Changes

- Add or update route pages in `src/App.tsx` when adding new features.
- Export reusable UI through the relevant barrel files.
- Keep API-driven values flowing from the database to the UI instead of inventing fallback data in shared cards.
- If you add a new lesson media field, keep the rendering responsive and treat embedded YouTube content as an iframe-style responsive block.
