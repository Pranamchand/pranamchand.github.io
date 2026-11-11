# Pranam Chand — Portfolio

Personal portfolio website built with a macOS desktop interface. Showcases my data analytics, business intelligence, and machine learning projects, along with my resume and certifications.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Express (`server.ts`) for optional API routes

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server (starts on `http://localhost:3000`):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## GitHub Pages Deployment

This repository works with both GitHub Pages deployment modes:

1. **Direct Branch Deployment (`main` / `root`)**: Pre-compiled assets in `gh-pages-bundle/` are loaded automatically when GitHub Pages serves the root branch directly. Run `npm run build` before committing if you make local code changes.
2. **GitHub Actions Deployment**: A workflow is included at `.github/workflows/deploy.yml` if you prefer setting **Settings -> Pages -> Source** to **GitHub Actions**.

## Environment Variables

Optional environment variables can be added to a `.env` file in the root directory (see `.env.example`):

- `GEMINI_API_KEY` — Used by the server-side assistant endpoint (`/api/ai/chat`). The app falls back to local portfolio search if no key is configured.
- `VITE_WEB3FORMS_ACCESS_KEY` — Optional key for the contact form.

## Structure

- `src/data/content.ts` — Portfolio projects, skills, certifications, and links
- `src/windows/` — Desktop window views (About, Projects, Resume, Terminal, Contact, etc.)
- `src/components/` — Window manager, dock, menu bar, and desktop icons
- `public/assets/` — Static images, icons, and resume PDF
