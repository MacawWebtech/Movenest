# MoveNest v6.2 fixes

- Auth: "Continue with Apple" added to Login and Register (black button per Apple guidelines, white in dark mode), under an "or continue with" divider. Register also gets "Continue with Google" to match Login.
- Footer: new Contact column on every page (address, phone, email, working hours) with location / phone / mail / clock icons. Footer grid is now 3 + 2 + 2 + 2 + 3 on desktop.
- Header (992–1279px, e.g. 1024px): nav links no longer wrap ("How It Works" stays on one line) and the quote button no longer gets cut off. Tighter nav spacing, slightly smaller logo and controls, and the CTA shortens to "Free Quote" in this range.
- Header below 992px (tablet and phone, e.g. 768px / 360px): the bar shows the logo, then the dark mode and RTL toggles and the menu button. Login and Get a Free Quote are only in the hamburger menu. The dark mode / RTL buttons were removed from the hamburger menu.
- Footer on tablets (768–991px): three-column grid. Row 1 is logo + Company + Services, row 2 is Support + Contact, with the four contact items in two columns. Newsletter and social icons share one row (icons right-aligned). The divider above the newsletter now lines up with the content edges at all widths. Time ranges and the PIN code never split across lines.
- Typography: all headings (h1–h6 and heading-style classes such as prices, stat numbers, titles) use weight 600; running text 400; labels, nav links and inline emphasis 500. No 700/800 weights remain. `<strong>` is 500, `.fw-bold` usages switched to `.fw-semibold`.

# MoveNest v2 refresh

- One primary button style everywhere: `.btn-primary` (coral). Secondary: `.btn-outline`, or `.btn-outline-light` on photos/dark bands. `.btn-coral` remains as an alias.
- Navigation order: Home, Services, Pricing, How It Works, About, Blog, Contact. "Get a Free Quote" always opens the pricing calculator.
- Home 1: moving-focused hero; services with category badges and starting prices; packages; then how it works.
- Home 2: hero padding/alignment fixed; services and pricing now come before the moving journey.
- Services page uses its own catalogue layout (unlike the home pages): light split intro with a Quick quote card (pre-fills the pricing calculator), sticky sidebar grouped by For homes / For business / Add-ons, and one panel per service (badge, rating, price, photo, inclusions, duration/crew facts, Get a quote + Book). Followed by the package comparison matrix, add-ons and FAQ.
- Pricing: fixed-price packages (Budget pick / Most purchased / Premium) above the calculator. "Book this package" pre-fills booking.html.
- How It Works: 6 steps with matching photos, alternating layout.
- Images renamed (kebab-case, no spaces), compressed to ≤1800px, duplicates removed; broken `Packing.jpg` / `packaging.jpg` references fixed. Blog cards use illustrated covers instead of reused photos.
- Section labels switched to sentence case for consistency.
- Mobile header: consistent gaps between logo, quote button and menu toggle; button shortens to "Free Quote" on phones and moves into the menu below 360px.
- Header direction toggle uses a text label (RTL / LTR, showing the direction it switches to) instead of an icon; mobile-menu and profile buttons read "Switch to RTL/LTR layout".
