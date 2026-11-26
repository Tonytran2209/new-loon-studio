# Editing Loon Studio with Sanity

Studio: https://loon-studio-cms.vercel.app/structure
Website: https://new-loon-studio.vercel.app/
Project/dataset: eeqvvhno / production.

## What is connected

Published homepage copy, services, lab explorations, insights, FAQs, navigation/footer and information popups are rendered at build time. Editorial images are Sanity assets. Canvas effects, process motion files, layout, demo-form safety labels and runtime notices remain code-owned.

Home and settings use fixed document IDs. Other content uses Sanity IDs. Read-only `sourceKey` keeps original popup/hash URLs intact. Adding/removing published records updates cards on the next build. Blog posts additionally have /insights/:slug pages; existing popup links still work. Changing a published post slug changes its page URL: add a permanent redirect before renaming a public URL.

## Editorial workflow

1. Edit an existing document in Studio, or create a service/exploration/post/FAQ.
2. Add title, unique slug (for services/explorations/posts), content and feature image with alt text. Set display order for homepage cards.
3. Publish. Draft edits are never used in public builds.
4. The website reads the published snapshot during the next Vercel deployment. The enabled Sanity webhook "Loon website — published content" calls the website Deploy Hook on published create/update/delete. Draft changes do not trigger deployments. Allow time for Vercel to finish the build.
5. Check https://new-loon-studio.vercel.app/cms-version.json for build time and content counts.

The article date is display metadata, not a publication scheduler. Don't put secrets in CMS content: this dataset's published content is publicly readable. Media is delivered by Sanity's CDN; privacy copy has been updated accordingly.

## Website Vercel project

Root Directory: repository root. Build: npm run build. Install: npm ci. Output: dist. Configuration is committed in root vercel.json. The separate Studio Vercel project keeps Root Directory studio and its own configuration. No write token is needed for the public website build.

## Automatic deployments

Create a Deploy Hook in the *website* Vercel project, Settings → Git, branch main. In Sanity Manage → API → Webhooks, create a POST webhook for production with Create/Update/Delete, drafts/versions disabled, and filter:

```groq
_type in ["homePage", "siteSettings", "service", "exploration", "post", "faq"]
```

Use the Deploy Hook URL as destination. Treat it as a secret; don't commit it or paste it into public Studio fields. A failed build leaves the previous successful website live. Monitor webhook delivery in Sanity and deployments in Vercel.

## Development and migration

npm ci; npm run build; npm run test:cms. Build fails if Sanity is unavailable or required singleton content is missing; it does not silently fall back to stale HTML. Source layout is templates/index.html; content is in CMS. Root index.html remains the pre-CMS source snapshot and isn't the deployed output.

Migration plan: migration/PLAN.md. Extract with npm run cms:extract. Import via `cd studio && npx sanity exec import-content.cjs --with-user-token`. The importer uses createIfNotExists, so rerunning does not overwrite editor changes. Local snapshots, manifest and reports are gitignored. Never copy migration data, credentials or Studio source into dist.

Migration completed: see ../migration/RESULTS.md. Automatic deployment webhook is enabled and was tested successfully.
