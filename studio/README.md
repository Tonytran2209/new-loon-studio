# Loon Studio CMS

Standalone Sanity Studio for project `eeqvvhno`, dataset `production`.

## Local development

```sh
npm ci
npm run dev
```

## Deploy on Vercel

Import `Tonytran2209/new-loon-studio` as a separate Vercel project. Set Root Directory to `studio`, Framework Preset to Other, Build Command to `npm run build`, Output Directory to `dist`, Install Command to `npm ci`, and Node.js to 24.x. The local `vercel.json` enables SPA deep links.

Project ID and dataset are public configuration in `sanity.config.ts`; no API token is needed to build this Studio. After deployment, add its exact HTTPS origin in Sanity Manage → API → CORS origins, with Allow credentials enabled. Sign in with an account that has access to the Sanity project.

The Structure tool contains Trang chủ, Dịch vụ, Studio exploration, Bài viết, FAQ and Cài đặt chung. Homepage and settings use fixed document IDs; ordinary documents use Sanity-generated IDs. Deploying Studio does not yet connect homepage content or publish updates to the main website.

Do not commit node_modules, dist, .sanity, cache folders, .env files or tokens.
