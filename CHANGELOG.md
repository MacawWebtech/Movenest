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
