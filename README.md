# Loon Studio

A static homepage for brand, web and motion, based on the original Loon Lab frontend.

## Deploy on Vercel

Import `Tonytran2209/new-loon-studio`. Framework Preset **Other**, empty Build Command, Output Directory **.**, repository root. No install/build step, environment variable or server function is required. `/` and `/loon-lab` show the same homepage.

## Preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000/; use an HTTP server rather than opening the HTML file directly.

## Design and implementation

- [Detailed UI design guide](docs/UI-DESIGN-GUIDE.md): tokens, typography, layout, responsive behavior, components, content and accessibility.
- `index.html` and `loon-lab.html`: semantic page sections, service details, explorations, studio notes, FAQ, demo contact form and footer. Keep both in sync.
- `styles/site.css`: design tokens and homepage styling; original vendor CSS remains separate.
- `scripts/site.js`: native dialog enhancement, local navigation and the demo brief flow.
- Original Webflow runtime still controls navigation and tabs. GSAP and vendor license headers are retained.

## Demo enquiry form

The form is deliberately a simulation. It validates fields and displays a **demo** confirmation; it does not send email, make a submission request, or save visitor details in browser/server storage. Users may explicitly copy or download a text brief. No API credentials are present. See the guide before connecting a real endpoint.

Explorations are independent visual studies, not claimed client case studies. Studio notes contain locally authored content. The page does not list verified job openings; the Collaborate dialog directs to the demo brief.

Images, fonts, CSS and JavaScript are local. Legacy analytics/consent integrations and the unused Cal.com embed were removed. Webflow's generated promotional badge is disabled without removing third-party license notices.
