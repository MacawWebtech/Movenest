# MoveNest — Home Shifting & Packing Service Template

A premium, original HTML/CSS/JS template for a household relocation
company, built on Bootstrap 5, semantic HTML5, and vanilla ES6+.

## What's included in this build

This delivers the design system and the highest-value pages from the
brief, fully wired together, rather than 20 shallow pages:

- **Design system** — `assets/css/style.css` (tokens, typography,
  components), `dark-mode.css` (dark-theme fixes), `rtl.css`
  (`dir="rtl"` support)
- **Shared behaviour** — `assets/js/main.js` (theme toggle, mobile
  nav, scroll reveal, FAQ accordion, form validation), plus
  `calculator.js` and `dashboard.js`
- **Pages**: `index.html` (Home 1 — split hero), `home-2.html` (Home 2
  — immersive/editorial, deliberately different layout), `about.html`,
  `services.html`, `pricing.html` (interactive calculator),
  `how-it-works.html`, `contact.html`, `login.html`, `register.html`,
  `dashboard.html`, `booking.html` (new request + confirmation),
  `track-move.html`, `invoice.html`, `profile.html` (includes
  settings), `404.html`

## Extending to the remaining pages in the original brief

`service-details.html`, `service-areas.html`, `blog.html`,
`blog-details.html`, and `coming-soon.html` weren't built in this
pass. They reuse existing components directly:

- **Service details** → copy a `services.html` card's content into
  the `.editorial-media` + `.price-breakdown` + `.faq-item` patterns
  already in `pricing.html` and `services.html`.
- **Service areas** → reuse `.area-chip` (see the Home 1 "Service
  Areas" section) inside a filterable grid; add a small JS filter
  keyed on category, following the pattern in `main.js`'s FAQ
  accordion.
- **Blog / Blog details** → `.review-card` and `.service-card`
  compose directly into an article grid and a single-post layout;
  add a search input wired the same way as the newsletter form.
- **Coming soon** → reuse `.state-page` and `.ticket` from `404.html`
  and `track-move.html`.

## Notes

- All imagery is served from Unsplash (`images.unsplash.com`) and
  RandomUser.me (portraits) — swap in your own licensed photography
  before production use.
- Forms are front-end only (validation via `main.js`); wire
  `booking.html`, `contact.html`, `login.html`, and `register.html`
  to your backend or a service like Formspree/Netlify Forms.
- The pricing calculator (`assets/js/calculator.js`) uses
  illustrative demo rates — replace with your real pricing model.
- Dark mode persists via `localStorage` and respects
  `prefers-color-scheme`; RTL is toggle-ready via `dir="rtl"` on
  `<html>`.
