# Migration verification

Target: eeqvvhno / production. Source: the existing English Loon Studio static homepage and its editorial dialogs.

Imported: 1 homePage, 3 service, 3 exploration, 3 post, 5 faq, 1 siteSettings. Nine images uploaded to Sanity. Preflight contained zero editorial documents. Existing form submissions and personal data were not imported.

Validated all imported documents against deployed schemas: no error-level markers. Five renderer tests cover existing copy, legacy hash targets, dynamic create/unpublish behavior, unique IDs, link safety, rich text and standalone article rendering. Twenty-two local runtime resource paths verified. Website build excludes Studio source, migration reports and build scripts.

Production checked at https://new-loon-studio.vercel.app/ with generated cms-version.json and the article route /insights/designing-useful-ai-assisted-experiences. Existing popup links remain operational. Mobile article image loaded successfully and layout stayed within viewport.

Automatic publishing: Vercel website Deploy Hook connected to enabled Sanity document webhook "Loon website — published content" for create/update/delete of the six editorial document types, with drafts/versions excluded. Tested by adding a temporary trailing space to the published hero description and immediately restoring it under revision guards. Both webhook messages reported success; subsequent website build completed. Original wording was verified restored. Hook destination and authentication are not committed.

Code-owned items: layout/motion assets, safety notices for the local demo form, runtime validation messages. Editorial paragraphs, navigation/footer text, service/exploration/article body content and FAQ are CMS-owned. SEO is generated at build time. Draft preview and scheduled publishing were not added.
