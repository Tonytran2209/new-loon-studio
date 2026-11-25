# New Loon Studio

Standalone static copy of https://loon-studio.webflow.io/loon-lab.

## Deploy on Vercel

Import this repository. Framework Preset: **Other**. Build Command: empty. Output Directory: **.**. Root Directory: repository root.
The homepage is served at `/`; `/loon-lab` also serves the same page.
No environment variables or installation are required.

## Preview

Run `python3 -m http.server 8000` in this folder, then open http://localhost:8000/.

## Contents and limitations

`index.html`: page markup. Local asset folders include CSS, Webflow runtime, GSAP, images and fonts. Original dropdowns, tabs and interactions use the original published JavaScript.
Source links set to `#` remain placeholders. Booking uses an external Cal.com service; this is not a copy of Webflow CMS or backend functionality. Analytics and old consent scripts were removed. Third-party libraries retain their licenses.
