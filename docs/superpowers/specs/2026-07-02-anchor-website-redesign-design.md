# Anchor Website — Full Redesign (Ledger-Teal System)

**Date:** 2026-07-02
**Type:** Full marketing-site redesign, replacing the entire current look.
**Source of truth:** the exported design bundle at
`scratchpad/design-import/anchor-payroll/project/` (six `Website *.dc.html`
files + the `_ds/` design system). Each page's `.dc.html` is the authoritative
spec for that page's exact copy, numbers, and layout.

## Locked decisions

1. **Scope:** rebuild the whole marketing site — all 6 designed pages + shared
   shell + design-system port. Fully replaces the current Bitter/purple+amber look.
2. **Un-designed pages:** DROP `security`, `contact`, `demo`, `privacy`, `terms`
   and their orphaned components. Add redirects from the old URLs.
3. **Theme:** LIGHT MODE ONLY. Keep the dark tokens in CSS (unused) but expose no
   toggle. Marketing pages are authored in light; the footer is always dark-teal.
4. **Get started / CTAs:** implement the designed **lead-capture form** on
   `/get-started`, wiring its submit to the existing `/api/submit` → Google Sheet.
   Every CTA site-wide ("Get started", "Sign in", "Create your account",
   "Talk to us…", "Get in touch") points to `/get-started`. No external app URL.
5. **Delivery:** subagent-driven development, per-task commits directly on `main`
   (explicit user consent: "you can push straight to main"), pushed at the end.

## Design language (from `_ds/…/readme.md` + tokens)

- **Ledger teal** primary (`--primary`, oklch ≈ 195) — the rare 10% money accent.
- **Brand purple** (`--brand-purple` `#662d91`) — logo/wordmark ONLY, never a UI accent.
- Typefaces: **Bricolage Grotesque** (display/headings), **Hanken Grotesk** (body/UI),
  **Geist Mono** (money, figures, eyebrows — `.tabular`, tabular-nums).
- Bank-grade calm: soft low shadows, 12–16px radii, generous whitespace, one
  primary action per view, exponential ease-outs (no bounce), rise+fade entrances.
- Numbers are sacred: `K` + grouped thousands + two decimals, always mono/tabular.
- Sentence case everywhere except the mono **eyebrow** labels (uppercase, tracked).
- Real typographic apostrophes and em-dashes. No emoji.

## Design-system port (foundation)

Port the token CSS into `src/app/globals.css`, **replacing** the current `@theme`:

- **colors.css** — all semantic tokens (`--background`, `--card`, `--surface-raised`,
  `--primary`, `--muted-foreground`, `--border`, `--success`, etc.), both `:root`
  (light) and `.dark` (kept, unused), plus `--brand-purple*`.
- **typography.css** — `--font-display/-sans/-mono`, weights, the fixed rem type
  scale, leading, tracking.
- **spacing.css** — 4px space scale, `--radius*`, `--shadow*`, `--container-max` (72rem;
  note pages actually use max-width **1120px** for the content column).
- **motion.css** — `--ease-out-quart/-expo`, `--duration-fast/-base/-slow`, `--stagger-step`.
- **base.css utilities** — `.tabular`, `.eyebrow`, `.text-tone`, `.animate-rise`
  (+ keyframes, `prefers-reduced-motion` guard).
- **components.css** — port `.anc-btn` (+ variants/sizes) since the pages use it;
  `.anc-input` for the Get started form.

Fonts: load **Bricolage Grotesque, Hanken Grotesk, Geist Mono** via
`next/font/google` (all three are available there), exposing
`--font-display / --font-sans / --font-mono`. This replaces the fonts.css CDN
`@import`. If any face is unavailable in `next/font`, fall back to the CDN `@import`.

Assets: copy `assets/brand/mark-purple.png` and `assets/brand/wordmark-purple.png`
from the export into `public/`.

Two React components (both used across pages):

- **`Icon`** — thin wrapper over `lucide-react` mapping the 17 kebab-case names used
  by the designs to their lucide components: `arrow-down-left, arrow-right,
  arrow-up-right, check, check-circle, clock, eye, file-text, lock, plus,
  receipt-text, rotate-cw, shield-check, smartphone, user-plus, users,
  wallet-minimal`. Props: `name`, `size`, `className`/style, optional `spin`.
  Stroke width 2, round caps (lucide defaults).
- **`Money`** — formats a number as Kwacha with the `K` prefix and `.00` decimals
  **stepped down** in size/tone relative to the integer part; mono/tabular. Sizes
  used: `lg` (~28px) and `display` (~56px). Matches the `.dc.html` `Money` usages.

**Hover translation:** the `.dc.html` files fake interactivity with a
`style-hover="…"` attribute (a design-tool runtime feature, NOT real CSS). Translate
each to real hover styling:
- nav links → `background: var(--accent); color: var(--accent-foreground)`
- feature cards → `transform: translateY(-4px)` + soft shadow +
  `border-color: color-mix(in oklch, var(--primary) 30%, var(--border))`
  (provide a reusable `.card-lift` class)
- text links → underline. All respect `prefers-reduced-motion`.

## Shared shell

- **Nav** (`src/components/nav.tsx`, client): sticky top, `backdrop-blur`,
  translucent `--background`, bottom hairline `--border`; inner max-width 1120px,
  height 64px. Left: `mark-purple.png` (30px) + `wordmark-purple.png` (17px tall).
  Center/right links → `/product`, `/who-its-for`, `/pricing`, `/about`. Active link:
  weight 600, `color: var(--foreground)`, `background: var(--accent)`. Far right:
  "Sign in" (text link → `/get-started`) + "Get started" (primary `.anc-btn`,
  38px → `/get-started`). **Add a responsive mobile menu** (reuse Radix Dialog as
  today) since the mockups are desktop-only.
- **Footer** (`src/components/footer.tsx`): always dark-teal
  `oklch(0.165 0.012 195)`, max-width 1120px. Col 1: "anchor" wordmark (`#9b6fc4`) +
  "Payroll that pays your people on their phones. Made in Lusaka, Zambia." Col 2
  **Product**: How it works→`/product`, Who it's for→`/who-its-for`, Pricing→`/pricing`.
  Col 3 **Company**: About→`/about`, Get started→`/get-started`. Bottom:
  "© 2026 Anchor · Automated Money Solutions". **No legal links.**

Wire Nav + Footer in `layout.tsx`; update `metadata` (brand tagline) and per-page
titles/descriptions.

## Pages (one implementer task each; raw `.dc.html` = spec)

- **`/` (Home)** ← `Website Home.dc.html`: Hero (2-col: copy + mock payroll-run card
  with floating "MTN MoMo · just now" note and "Next payroll" pill; `Money` display
  =24150; 3 employee rows), How it works (4 numbered step cards), Two ways to pay
  (2 cards), Wallet (split + wallet card, `Money` display=38400, activity rows),
  Networks (MTN live / Airtel / Zamtel coming), Who-it's-for (dark SME card +
  Individuals card), Founding-customer CTA.
- **`/product`** ← `Website Product.dc.html`: Hero, Employees (split + employee-list
  card), Run payroll (3 cards), Proof (split + confirmed-payment receipt card,
  `Money` lg=3200), Money safety (3 cards), CTA band.
- **`/who-its-for`** ← `Website Who its for.dc.html`: Hero, SMEs (split + 3 feature
  cards), Individuals (split + 3 feature cards), CTA band.
- **`/pricing`** ← `Website Pricing.dc.html`: Hero, two-card early-access grid
  (Founding-customer `surface-raised` card + "What to expect" dashed card). No prices.
- **`/about`** ← `Website About.dc.html`: Hero + 3 story paragraphs, 3 value cards,
  "Want to talk to us?" contact CTA card.
- **`/get-started`** ← `Website Get started.dc.html`: 2-col — benefits copy + the
  form card. Fields: name, business (optional), phone, email, team-size select.
  Submit posts to `/api/submit`; on success show the designed "Thanks, we've got it."
  state with a "Send another request" reset. Client component.

## Removals & redirects

Delete: `src/app/{security,contact,demo,privacy,terms}/`, and components
`contact-form.tsx`, `demo-form.tsx`, `disbursement-card.tsx`, plus `scroll-reveal.tsx`
if unreferenced after the rebuild. Keep `src/app/api/submit/route.ts`.
Add redirects (in `next.config.ts`): `/contact` & `/demo` → `/get-started`;
`/security` → `/product`; `/privacy` & `/terms` → `/about` (the closest surviving
"company info" page).

## Global constraints (bind every task)

- **Fidelity:** match each `.dc.html`'s copy **verbatim** (real apostrophes,
  em-dashes, exact numbers like `K24,150.00`, `K38,400.00`, `K3,200.00`), spacing,
  colors, and layout. Use semantic tokens — never raw hex except the design's own
  literals (network dots `#FFCC00/#E4002B/#00A651`, footer purple `#9b6fc4`).
- **Responsive:** faithful desktop; two-column grids collapse to single column and
  card grids reflow on mobile; nav gets a mobile menu. Don't drop content on mobile.
- **Light only.** No theme toggle.
- **Next.js 16 is modified** — consult `node_modules/next/dist/docs/` before using any
  Next API (`next/font`, `metadata`, `Image`, `Link`, `redirects`). Heed deprecations.
- **A11y:** status is word+icon+color (never color alone); focus-visible rings from
  `--ring`; images have alt text; respects `prefers-reduced-motion`.
- **No new runtime network deps** beyond the fonts. Icons via existing `lucide-react`.
- **Verification:** `npm run build` and `npm run lint` clean at the end; spot-check
  pages render and CTAs route to `/get-started`.

## Component / route architecture (target)

```
src/app/
  layout.tsx            # fonts (next/font), Nav, Footer, metadata
  globals.css           # ported ledger-teal tokens + utilities
  page.tsx              # Home
  product/page.tsx
  who-its-for/page.tsx
  pricing/page.tsx
  about/page.tsx
  get-started/page.tsx  # client form → /api/submit
  api/submit/route.ts   # unchanged
src/components/
  nav.tsx  footer.tsx
  ui/icon.tsx  ui/money.tsx   # DS primitives
public/  mark-purple.png  wordmark-purple.png
next.config.ts           # redirects for dropped routes
```
