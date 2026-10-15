# Srushti Ghatge — Portfolio

A responsive, static portfolio built with semantic HTML, CSS, and vanilla JavaScript. No build step or package installation is needed.

## Preview

Open `index.html` in a browser, or run `node tools/preview.mjs` and visit the printed local URL. Stop the preview server with Ctrl+C.

## Structure

- `index.html` — profile, projects, skills, education, and contact content.
- `style.css` — design tokens, section styles, and responsive layouts.
- `script.js` — mobile navigation, active sections, project filters, and contact form handling.
- `assets/images/` — original profile photographs.
- `assets/resume/Resume.pdf` — downloadable résumé.
- `assets/favicon.svg` — site icon.
- `tools/preview.mjs` — dependency-free local preview server.

## Editing

Update profile and project content directly in `index.html`. All projects remain readable without JavaScript. The learning-lab cards use `data-category` values (`vision`, `language`, `ml`) for filtering; a card can have multiple categories separated by spaces. Project details and learning milestones use native expandable `details` elements.

Change the palette and typefaces in the `:root` tokens at the top of `style.css`. Section styles follow the page order; mobile and tablet rules are grouped at the end.

Replace `assets/resume/Resume.pdf` to update the résumé while keeping existing download links working.

## Contact

The form preserves the original Formspree endpoint in its `action` attribute. Sending requires a network connection and an active Formspree form. The browser displays pending, success, and error states, retains drafts on failure, and falls back to native submission when JavaScript is unavailable. No secret credentials are stored in this project.

## Hosting

Serve `index.html`, `style.css`, `script.js`, and `assets/` together using any static host. Keep asset paths and filename capitalization intact. The only external visual dependency is the optional Google Fonts stylesheet; local system fonts remain available as a fallback.
