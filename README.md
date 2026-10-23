# Shaurya Gogia — Portfolio

My personal portfolio showcasing software engineering, distributed systems, AI/ML, cloud services, and published research. Projects include an AI-driven IoT crop disease management system, facial emotion recognition, AI Study Helper, and MedGuide AI. Built with React, TypeScript, Vite, and Tailwind CSS, with reusable shadcn/ui components.

## Local development

Requires Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Build and preview

```sh
npm run build
npm start
```

The production site is generated in `dist/`. Preview it at http://localhost:4173. Deploy the contents of `dist/` to a static host; no backend or environment variables are required. The contact form opens the visitor's email app.

This is a client-rendered React app. The HTML entry includes page metadata and a JavaScript-disabled fallback with contact and résumé links. If your host uses a fallback for unknown URLs, the app displays a page-not-found screen for paths other than `/`.

## Content and design

- `src/lib/portfolio-data.ts`: profile, experience, skills, project work, education, and research.
- `src/App.tsx`: page sections, navigation, project filters, theme switching, and contact form.
- `src/components/CertificateDialog.tsx`: certificate previews and details, accessible from credentials and linked experience entries, with original-file and download links.
- `src/styles.css`: colors, typography, animations, and responsive styles.
- `index.html`: document title, social metadata, fonts, and browser entry point.
- `public/resume.pdf`: downloadable résumé.
- `public/certificates/`: original certificates and previews for the certificate dialogs.
- `public/favicon.svg`: custom SG monogram.

Update résumé and employment details as your experience changes. Repository and demo links appear only when their URLs are added to the content file.

## Checks

```sh
npm run typecheck
npm test
npm run lint
npm run format
```

## Structure

```text
index.html                  HTML entry point and metadata
public/                     Résumé, favicon, and robots.txt
src/App.tsx                 Portfolio interface
src/main.tsx                React entry point
src/components/             Error boundary and reusable UI components
src/hooks/                  Shared React hooks
src/lib/                    Content and utilities
src/test/                   Interaction tests and browser test setup
src/styles.css              Global theme and styles
vite.config.ts              Vite build and dev server
```

## Stack references

- [React](https://react.dev/)
- [Vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
