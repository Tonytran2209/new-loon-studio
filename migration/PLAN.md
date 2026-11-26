# Static HTML → Sanity

Source: current committed homepage, English published content only, local editorial JPEGs. Target: eeqvvhno / production. Preflight found zero existing editorial documents; snapshot kept privately in migration/reports. No user form submissions are migrated.

Mapping: homepage text → homePage; services → service (3); lab cards/dialogs → exploration (3); insights/dialogs → post (3); FAQs → faq (5); menu/footer/auxiliary dialogs → siteSettings. Nine card images are uploaded and deduplicated by source file hash. Motion HTML, fonts, canvas effects and accessibility UI remain code assets. Rich text is Portable Text, not stored HTML. Existing hash routes are preserved through read-only source keys; new articles also receive standalone /insights/:slug pages.

Singleton IDs are homePage/siteSettings. Ordinary IDs are UUIDs persisted in the private migration manifest, with a read-only sourceKey for reruns and QA. Import uses createIfNotExists, never overwrites editorial changes. Assets precede documents. Build reads only published documents, renders HTML before delivery, and fails on unavailable CMS rather than silently publishing stale data.

Cutover: extract a frozen template snapshot, import, verify counts and required fields/assets, compare visible text and old anchor targets, then deploy the build pipeline. Deletions/unpublishes remove records from generated cards; original source IDs remain mapped to avoid changing old popup links. A Sanity webhook should call a Vercel Deploy Hook for publish/update/delete; hook URLs stay out of Git. Until that hook is configured, publishing requires a Vercel redeploy.
