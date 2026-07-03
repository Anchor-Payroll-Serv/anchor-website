# Anchor Payroll — Design System

> Brand and product design system for **Anchor**, a B2B payroll / salary-disbursement platform for an African market. Companies add employees, fund a wallet, run payroll, and prove payment; employees check "did I get paid?" on their phone. Currency is the **Zambian Kwacha (`K…`)**.

This system exists to make Anchor look and feel **uniform and professional** — one grounded palette, one type system, one set of components — instead of every screen reinventing its own look.

---

## Sources

Everything here was derived from real Anchor material. You may not have access, but they're recorded so you can dig deeper:

- **Frontend codebase** — `Anchor-Payroll-Serv/anchor-frontend` (`https://github.com/Anchor-Payroll-Serv/anchor-frontend`). React 19 · Vite · Tailwind v4 · shadcn/ui (new-york, neutral base) · TanStack Query/Router · Recharts · Framer Motion · Lucide. The token system, components and screens here are recreated from this repo — the dashboard's `src/style.css` and `src/components/dashboard/*`, `src/components/employee/*` are the source of truth.
- **`.impeccable.md`** (in that repo) — the product's design brief. Quoted throughout.
- **Logo pack** — `Anchor Logos 2.zip` (uploaded). Curated into `assets/brand/`.
- Related repos for deeper context: `anchor-backend`, `payment-gateway`, `anchor-website`.

> The frontend is **mid-redesign** — the dashboard and employee portal have moved to the new semantic-token system; the **login page still ships the legacy slate/blue look**. This system reflects the intended (redesigned) direction.

---

## Brand colour — two colours, two jobs

Anchor runs on **two** colours with clearly separated roles:

- **Product UI → ledger teal** (`--primary`, oklch ≈ 195). A calm, trustworthy teal — the rare 10% accent for the money action and positive confirmation. Neutrals are tinted toward it so surfaces feel of one material. *(Chosen over the original frontend green, which read as an "AI-default" cliché.)*
- **Logo / marketing → brand purple** (`--brand-purple`, `#662d91`) — the 3D "A" mark, lowercase *anchor* wordmark, and *"Automated Money Solutions"* tagline.

Teal sits more harmoniously beside the purple mark than green did. If you later want a single unified colour, the open option is to commission a teal logo lockup — until then, purple stays the logo colour and teal is the product colour.

---

## Content fundamentals — how Anchor writes

The voice is **trustworthy, grounded and reassuring** — *dependable, precise, calm.* Bank-grade, but as clear as a well-kept ledger. Explicitly **not** flashy, trendy-startup-loud, playful or crypto-dark.

- **Person & address:** Speak to the user as **"you"**; Anchor is **"we"** (e.g. *"We couldn't load your wallet just now."*). Warm but never chummy.
- **Lead with reassurance, especially around money.** Error copy de-risks first: *"Your money is safe — this is only the view."* / *"Your data is safe — this is only the view."* Calm the anxiety before explaining the problem.
- **Plain, concrete, human.** *"Add your team to run your first payroll."* / *"Top up to cover K42,000."* / *"Heading to Airtel Money •••• 4821 · usually arrives within minutes."* No jargon, no finance-speak; clear, never dumbed-down.
- **Casing:** Sentence case everywhere — headings, buttons, labels. The only upper-case is the **eyebrow** (mono, tracked) used as a small statement caption (*NEXT PAYROLL*, *AVAILABLE BALANCE*, *WALLET ACTIVITY*).
- **Numbers are sacred.** Always `K` + grouped thousands + two decimals (`K248,500.00`); always tabular mono so columns line up. Status is always a **word + icon + colour**, never colour alone (*Paid*, *Processing*, *Partial*, *Failed*, *Scheduled*).
- **Buttons name the outcome:** *"Review & run payroll"*, *"Add funds"*, *"Top up to cover K42,000"* — not *"Submit"* / *"OK"*.
- **Apostrophes & tone markers:** real typographic apostrophes (*you've*, *couldn't*); the em-dash is used for the reassuring aside. **No emoji.**
- **Headlines answer the user's question:** *"You've been paid"* / *"Your pay is on the way"* / *"That payment didn't go through"* — the status, in their words, first.

---

## Visual foundations

**Reference feel:** a modern bank statement / well-organised financial ledger — structured, legible, quietly confident. **60-30-10** weighting: mostly neutral surfaces, some secondary, and the teal accent used *rarely* — reserved for the one money action and positive confirmation.

### Colour

- **One brand hue tinted through the neutrals** (oklch). Product primary is a grounded, trustworthy teal at **hue ≈ 195**; every neutral (background, card, border, muted) carries a faint teal tint so surfaces feel of one material. See `tokens/colors.css`.
- **Semantic tokens only** — `--background`, `--card`, `--surface-raised`, `--primary`, `--muted-foreground`, `--border`, etc. Never raw colour utilities. Status uses `--success` / `--warning` / `--destructive`, tinted to soft backgrounds via `color-mix(in oklch, var(--tone) 15%, var(--card))`.
- **Chroma drops at the lightness extremes**; status hues are kept "true" by mixing toward black/white (not the brand-tinted foreground) so a red stays red.
- **Both themes are first-class.** Light is the daytime default (finance work, the anxious "did I get paid" moment reads calmer in light); dark is a fully-built peer with a lifted primary, not a careless derivation. Toggle by adding `class="dark"`.

### Typography

- **Bricolage Grotesque** for display, headings and the wordmark (real character — not an AI-default face). **Hanken Grotesk** for all UI and body. **Geist Mono** for *every* monetary and tabular figure, plus the eyebrow labels — mono numerals align like a ledger.
- Fixed `rem` type scale (not fluid), ≥1.25 ratio between steps. The hero balance is the show-stopper: \~56px mono, the `K` prefix and `.00` decimals stepped **down** in size and tone so the whole number carries the weight (`Money` component, `size="display"`).
- Strong hierarchy, generous whitespace, one primary action per view.

### Shape, depth & layout

- **Corner radius from a single `--radius` (12px):** inputs/small buttons `sm` (8px), cards `xl` (16px), pills/badges/avatars fully round. Calm, not bubbly.
- **Cards:** `--card` surface, 1px `--border` hairline, soft low `shadow-sm`. The focal band (next payroll / wallet balance / latest payment) steps up to `--surface-raised`. **Never nest a card in a card**; no side-stripe accent borders.
- **Panels** are the workhorse container: a bordered surface with a mono eyebrow header and list rows that run edge-to-edge.
- **Shadows are soft, low and single-direction** — bank-grade calm, never floaty or glowy.
- **App chrome:** sticky translucent header with `backdrop-blur`; content in a centred `max-w-6xl` (1152px) column. Mobile gets thumb-reachable single-column flows; desktop gets dense tables — *adapt, don't amputate.*

### Motion

- **Exponential ease-outs, no bounce/spring** (`--ease-out-expo`, `--ease-out-quart`). Money UIs should feel settled and certain.
- Page-load entrance is a subtle **rise + fade**, staggered per item via `--i` (`.animate-rise`). Coverage meters fill from 0 with an ease-out. Overlays fade their backdrop; modal panels rise quickly.
- **Hover:** surfaces shift to `--accent`; primary buttons darken \~10% (`color-mix` toward black); links underline. **Press/focus:** a 3px `--ring` ring at \~45% — no shrink/scale. Everything respects `prefers-reduced-motion`.

### What to avoid (anti-references)

Generic dark dashboards with glowing accents · purple→blue or any decorative gradients · gradient text · decorative sparklines · side-stripe accent borders · card-in-card nesting · "three identical stat cards with a corner icon" · every-button-is-primary · emoji.

---

## Iconography

- **Lucide** (`lucide.dev`), used throughout the product via `lucide-react`. Stroke icons, 24×24 viewBox, **stroke-width 2**, round caps/joins. No fills, no duotone.
- This system ships a **self-contained inline subset** of the exact Lucide paths the product relies on as the **`Icon`** component (`components/icons/Icon.jsx`) — so components and mocks have zero icon dependency. `<Icon name="wallet-minimal" size={18} />`, `<Icon name="loader" spin />`. See the *Icons* card for the full set; add more by pasting a Lucide icon's inner SVG into the `ICONS` map.
- **Status icons are paired with a word** (accessibility): `check-circle` Paid · `loader` Processing · `circle-slash` Partial · `triangle-alert` Failed · `clock` Scheduled.
- **No emoji, no unicode-glyph icons.** The brand **mark** itself (the purple 3D "A") is a logo asset, not an icon — don't substitute it for the Lucide `anchor` glyph used as app chrome.

---

## Index / manifest

**Foundations**

- `styles.css` — the one stylesheet consumers link (a list of `@import`s).
- `tokens/colors.css` · `typography.css` · `spacing.css` · `motion.css` · `fonts.css` · `base.css` — CSS custom properties, `@font-face` and utility classes (`.eyebrow`, `.tabular`, `.text-tone`, `.animate-rise`).
- `components/components.css` — interaction-state classes (`.anc-btn`, `.anc-input`, …).

**Components** (`window.AnchorPayrollDesignSystem_8c2662`)

- `components/core/` — `Button`, `Card` (+ `CardHeader/Title/Description/Content/Footer`), `Badge`, `Avatar`
- `components/forms/` — `Input` (optional leading icon), `Field`
- `components/feedback/` — `StatusBadge`, `CoverageMeter`
- `components/money/` — `Money` (+ `formatKwacha`), `Panel`, `SummaryStrip`
- `components/icons/` — `Icon`, `ICON_NAMES`

**UI kits**

- `ui_kits/admin/` — employer dashboard (login → overview → wallet → employees), interactive.
- `ui_kits/employee/` — mobile employee pay portal (paid / pending / failed states).

**Assets**

- `assets/brand/` — curated logo set (mark, wordmark, lockups; light/dark/white variants).
- `assets/logos/` — the full original logo pack (28 files) for reference.

**Guidelines** — specimen cards in `guidelines/` populate the Design System tab (Colors, Type, Spacing, Brand).

**Other** — `SKILL.md` (Agent-Skill wrapper for Claude Code).

---

## Caveats / known substitutions

- **Fonts load from Google Fonts CDN** (Bricolage Grotesque, Hanken Grotesk, Geist Mono) via `tokens/fonts.css` rather than self-hosted binaries — no font files were provided. If you need offline/self-hosted copies, drop `.woff2` files into `assets/fonts/` and swap the `@import` for local `@font-face` rules.
- **The login screen** faithfully recreates the current frontend's split-screen `AuthLayout` (ledger brand panel + sample payroll statement + form) — `auth-layout.tsx` + `auth-parts.tsx` + `login-page.tsx`.
- **Colour & type were chosen via the `Colour and Type Explorer.html`** (teal + Bricolage). The Explorer is kept in the project root so you can revisit other directions any time.
