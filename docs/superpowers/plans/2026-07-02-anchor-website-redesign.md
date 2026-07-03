# Anchor Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the entire Anchor marketing website with the exported "ledger-teal" design system — six redesigned pages, a new shared nav/footer shell, and the underlying token/typography port — while dropping the pages that have no counterpart in the new design.

**Architecture:** A Next.js 16 App Router site. Foundation tasks port design tokens and two presentational primitives (`Icon`, `Money`); a shell task rebuilds Nav/Footer; six page tasks each transcribe one `.dc.html` design into a route; a final cleanup task removes dropped routes/components and adds redirects. Every task lands as its own commit directly on `main`.

**Tech Stack:** Next.js 16.2.4, React 19.2.4, Tailwind CSS v4, TypeScript, lucide-react 1.8.0, Radix UI Dialog, `next/font/google`.

**Source of truth:** `docs/design-reference/` (committed in this repo) — six page files under `website/*.dc.html`, design tokens under `tokens/*.css`, `components.css`, and `design-system-readme.md`. These are copies of the exact exported design; **do not** open the `.dc.html` files in a browser — they depend on design-tool runtime scripts that were not copied in, and will not render. Read them as literal markup/CSS source to transcribe.

## Global Constraints

These bind every task below. Re-read this section before starting any task.

**1. No test framework exists in this repo** (no jest/vitest, no `__tests__`). Do not add one — that is infrastructure scope beyond a visual redesign. Verification per task is:
   - `npm run lint` clean (ESLint, already configured).
   - `npm run build` clean (this also runs the TypeScript compiler across the app — it is the type-check gate).
   - Manual verification via `npm run dev` — load the route in a browser and compare against the copy/structure tables in the task and against `docs/design-reference/website/<page>.dc.html`.
   - Where a task's deliverable is pure formatting logic (the `Money` component), verify by rendering it with the exact literal values used on the pages (3200, 24150, 38400, 38400.5 etc.) and confirming the on-screen string matches the pattern `K<grouped-thousands>.<2 decimals>` exactly, e.g. `K24,150.00`.

**2. Token migration is additive-until-cleanup — never delete a Tailwind token an unconverted page still uses.** `src/app/globals.css` currently defines legacy tokens (`--color-brand`, `--color-brand-mid`, `--color-brand-deep`, `--color-amber*`, `--color-surface*`, `--color-white`, `--color-ink*`, `--color-border*`, `--spacing-section`) that the *not-yet-replaced* pages/components still depend on. **Task 1 adds the new design-system tokens without touching these legacy lines.** Only Task 10 (once every consumer is replaced or deleted) removes them. Font tokens are the one exception — swap them outright in Task 1 (see Task 1's rationale); a font change is a visual style shift, not an invisible/broken-render failure, so it is safe to change globally on commit 1.

**3. Design fidelity.** Match each `.dc.html`'s copy **verbatim** — real typographic apostrophes (’) and em-dashes (—), exact numbers (`K24,150.00`, `K38,400.00`, `K3,200.00`, `+K20,000.00`, `−K24,150.00`), exact section order. Use semantic CSS variables (`var(--primary)`, `var(--muted-foreground)`, etc.) — never raw hex, except the design's own literal one-off colors: network dots `#FFCC00` / `#E4002B` / `#00A651`, footer wordmark `#9b6fc4`.

**4. Light mode only.** Port both `:root` and `.dark` token blocks (so the system is complete and future dark-mode work is a token flip, not a rewrite), but nothing in the app applies the `.dark` class. No toggle.

**5. Token consumption pattern — read carefully, it is binding for every page task:**
   - New design-system tokens (`--background`, `--foreground`, `--card`, `--primary`, `--border`, etc.) live as **plain CSS custom properties in a `:root`/`.dark` block**, ported verbatim from `docs/design-reference/tokens/colors.css`, `spacing.css`, `motion.css` — **not** inside Tailwind's `@theme` block, and **not** `--color-`-prefixed. They are consumed the same way the source `.dc.html` files consume them: `style={{ background: "var(--card)" }}`, never as invented Tailwind utility classes like `bg-primary` (they won't exist — don't invent them).
   - The **only** tokens that go inside `@theme` are the three font families (`--font-display`, `--font-sans`, `--font-mono`) — Tailwind's `font-display`/`font-sans`/`font-mono` utilities are generated from `@theme`, and the existing codebase already relies on this for its own (legacy) fonts.
   - **HTML→JSX conversion rules** (apply uniformly across all page tasks):
     - `style="prop: value; prop2: value2"` → `style={{ prop: 'value', prop2: 'value2' }}` (camelCase the property, keep values as strings exactly as written).
     - `class="foo"` → `className="foo"`.
     - `style-hover="…"` (a design-tool-only attribute, not real CSS) → replaced by one of four reusable classes defined in Task 1's `globals.css` (full definitions there): `.nav-link` (nav link hover), `.card-hover` (feature-card lift), `.link-underline` (text-link underline), `.signin-link` (nav "Sign in" hover). Apply the matching class alongside the base inline `style`.
     - `data-screen-label="…"` and `data-comment-anchor="…"` (design-tool-only attributes) → drop entirely, not part of the real DOM.
     - `<x-import component-from-global-scope="…Icon" name="X" size="{{ N }}" style="…">` → `<Icon name="X" size={N} style={{ … }} />` (Task 2's component).
     - `<x-import component-from-global-scope="…Money" value="{{ N }}" size="lg|display">` → `<Money value={N} size="lg|display" />` (Task 2's component).
     - `href="Website X.dc.html"` → the matching route via `next/link`'s `<Link>`: Home→`/`, Product→`/product`, Who its for→`/who-its-for`, Pricing→`/pricing`, About→`/about`, Get started→`/get-started`.
     - `<img src="assets/brand/mark-purple.png">` / `wordmark-purple.png` → `next/image`'s `<Image src="/mark-purple.png" … />` / `/wordmark-purple.png` (already copied into `public/`).
   - **Responsive collapse** (the source designs are desktop-only, fixed `grid-template-columns`; the spec requires mobile collapse). For any section using `display: grid; grid-template-columns: repeat(N, 1fr)` or a fractional split (e.g. `1.1fr 0.9fr`), express `display`/`grid-template-columns`/`gap` as **Tailwind classNames**, not inline style, so responsive prefixes work: `className="grid grid-cols-1 md:grid-cols-2 gap-5"` (2-col), `className="grid grid-cols-1 md:grid-cols-3 gap-5"` (3-col), `className="grid grid-cols-1 md:grid-cols-4 gap-5"` (4-col). For asymmetric splits (e.g. `1.1fr 0.9fr`, `1.4fr 1fr`, `1.2fr 0.8fr`), use `md:grid-cols-[1.1fr_0.9fr]` etc., matching the exact fractions in the source. Keep every other property (colors, radius, shadow, border, padding-within-card, typography) as inline `style` matching the source. Gap px→Tailwind: 12px=`gap-3`, 14px=`gap-3.5`, 16px=`gap-4`, 20px=`gap-5`, 24px=`gap-6`, 32px=`gap-8`, 48px=`gap-12`, 64px=`gap-16`. For section vertical padding that doesn't hit a clean step (88px, 96px, 80px, 72px), use arbitrary-value classes: `py-[88px]`, horizontal 24px is always `px-6`.
   - Content column wrapper: every section body uses `className="max-w-[1120px] mx-auto px-6"` plus the section's specific vertical padding class, matching the source's `max-width: 1120px; margin: 0 auto; padding: Npx 24px`.
   - **CSS custom properties in a `style` object** (the `--i` stagger index for `.animate-rise`, the `--tone` used by `.text-tone`) are not valid keys on React's `CSSProperties` type. Write them as a plain string-literal key and cast the whole object: `style={{ "--i": 0, margin: "0 0 18px" } as React.CSSProperties}`. Do **not** use a computed key like `["--i" as string]: 0` — mixed with other statically-typed properties in the same object literal, that pattern risks a TypeScript build error rather than a clean cast.

**6. This Next.js install has documented breaking changes from training-data expectations** (per `AGENTS.md`) — already verified for this plan: `next/font/google` exports `Bricolage_Grotesque`, `Hanken_Grotesk`, `Geist_Mono` (confirmed present in this install's font data, all three variable-weight, ranges covering 100/200–800/900), and `lucide-react@1.8.0` exports all 17 icon names this plan uses in standard PascalCase (verified against the installed package's barrel file). No further doc-checking needed for these two dependencies. If any task needs a Next.js API not already used elsewhere in this codebase, check `node_modules/next/dist/docs/` first.

**7. Accessibility:** status is always word+icon+color, never color alone (already how the designs are built — preserve it). Images carry real `alt` text. Respect `prefers-reduced-motion` (the ported `.animate-rise` keyframe already guards this). Focus-visible rings use `var(--ring)`.

**8. Commits:** one commit per task, directly on `main` (explicit standing user instruction — no PR/branch needed). Conventional, present-tense commit messages.

---

### Task 1: Design-system token & font foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: CSS custom properties consumed by every later task via `var(--token-name)` — `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--surface-raised`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--success`, `--success-foreground`, `--warning`, `--warning-foreground`, `--border`, `--input`, `--ring`, `--brand-purple`, `--brand-purple-600`, `--brand-purple-700`, `--brand-purple-foreground`, `--space-1`…`--space-12`, `--radius`, `--radius-sm/md/lg/xl/full`, `--shadow-xs/sm/md/lg`, `--container-max`, `--ease-out-quart`, `--ease-out-expo`, `--ease-in-out-quint`, `--duration-fast/base/slow/meter`, `--stagger-step`, `--text-2xs/xs/sm/base/lg/xl/2xl/3xl/display`, `--leading-tight/snug/normal`, `--tracking-tight/normal/eyebrow`, `--weight-regular/medium/semibold/bold/extrabold`. Also produces four hover classes (`.nav-link`, `.card-hover`, `.link-underline`, `.signin-link`) and utility classes `.tabular`, `.eyebrow`, `.text-tone`, `.animate-rise`, `.anc-btn`, `.anc-input` (the latter provides only the `:focus-visible`/`:disabled`/`::placeholder` states — Task 9's inline styles already cover sizing/border/background, so the class isn't redundant with them), consumed by every later task.
- Consumes: nothing (foundation task).

- [ ] **Step 1: Port the color, spacing, motion, and typography tokens into `globals.css` as a new `:root`/`.dark` block, additive to the existing `@theme`**

Open `src/app/globals.css`. Directly **after** the existing `@theme { … }` block (leave every line inside it untouched), insert:

```css
/* ------------------------------------------------------------------ *
   Anchor — Ledger-teal design system tokens (the 2026 redesign)
   Ported verbatim from docs/design-reference/tokens/*.css.
   Plain custom properties — consumed via var(--x) in inline styles,
   NOT auto-generated Tailwind utilities. See plan Global Constraint 5.

   The legacy --color-* tokens above this block remain in place until
   every consumer is migrated (Global Constraint 2) — do not remove them
   here.
 * ------------------------------------------------------------------ */
:root {
  color-scheme: light;

  /* — Surfaces & text — */
  --background: oklch(0.972 0.006 195);
  --foreground: oklch(0.245 0.018 195);

  --card: oklch(0.995 0.004 195);
  --card-foreground: oklch(0.245 0.018 195);
  --popover: oklch(0.995 0.004 195);
  --popover-foreground: oklch(0.245 0.018 195);

  --surface-raised: oklch(0.99 0.006 195);

  /* — Brand / primary (the rare 10% accent) — */
  --primary: oklch(0.52 0.10 195);
  --primary-foreground: oklch(0.99 0.012 195);

  --secondary: oklch(0.94 0.013 195);
  --secondary-foreground: oklch(0.32 0.03 195);

  --muted: oklch(0.952 0.009 195);
  --muted-foreground: oklch(0.46 0.018 195);

  --accent: oklch(0.93 0.02 195);
  --accent-foreground: oklch(0.3 0.035 195);

  /* — Status — */
  --destructive: oklch(0.505 0.18 27);
  --destructive-foreground: oklch(0.99 0.01 27);

  --success: oklch(0.5 0.13 158);
  --success-foreground: oklch(0.99 0.012 158);

  --warning: oklch(0.66 0.14 75);
  --warning-foreground: oklch(0.27 0.05 75);

  /* — Lines & focus — */
  --border: oklch(0.9 0.01 195);
  --input: oklch(0.89 0.011 195);
  --ring: oklch(0.52 0.10 195);

  /* — Brand logo purple (marketing / logo only) — */
  --brand-purple: #662d91;
  --brand-purple-600: #5a2780;
  --brand-purple-700: #4c2169;
  --brand-purple-foreground: oklch(0.99 0.01 300);

  /* — Spacing — 4px base — */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-7: 1.75rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;

  /* — Radius — */
  --radius: 0.75rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-full: 9999px;

  /* — Elevation — */
  --shadow-xs: 0 1px 2px 0 oklch(0.2 0.02 160 / 0.05);
  --shadow-sm: 0 1px 3px 0 oklch(0.2 0.02 160 / 0.08), 0 1px 2px -1px oklch(0.2 0.02 160 / 0.06);
  --shadow-md: 0 4px 12px -2px oklch(0.2 0.02 160 / 0.1), 0 2px 6px -2px oklch(0.2 0.02 160 / 0.06);
  --shadow-lg: 0 16px 40px -8px oklch(0.2 0.02 160 / 0.18);

  --container-max: 72rem;

  /* — Motion — */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);
  --duration-fast: 0.2s;
  --duration-base: 0.26s;
  --duration-slow: 0.62s;
  --duration-meter: 0.9s;
  --stagger-step: 70ms;

  /* — Type scale (rem) — */
  --text-2xs: 0.6875rem;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-display: 3.5rem;

  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;

  --tracking-tight: -0.04em;
  --tracking-normal: 0;
  --tracking-eyebrow: 0.12em;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;
}

.dark {
  color-scheme: dark;

  --background: oklch(0.165 0.012 195);
  --foreground: oklch(0.94 0.008 195);

  --card: oklch(0.197 0.014 195);
  --card-foreground: oklch(0.94 0.008 195);
  --popover: oklch(0.215 0.015 195);
  --popover-foreground: oklch(0.94 0.008 195);

  --surface-raised: oklch(0.225 0.016 195);

  --primary: oklch(0.74 0.10 195);
  --primary-foreground: oklch(0.18 0.03 195);

  --secondary: oklch(0.25 0.013 195);
  --secondary-foreground: oklch(0.92 0.008 195);

  --muted: oklch(0.25 0.011 195);
  --muted-foreground: oklch(0.72 0.013 195);

  --accent: oklch(0.275 0.018 195);
  --accent-foreground: oklch(0.95 0.01 195);

  --destructive: oklch(0.62 0.17 27);
  --destructive-foreground: oklch(0.98 0.012 27);

  --success: oklch(0.74 0.13 158);
  --success-foreground: oklch(0.18 0.03 158);

  --warning: oklch(0.8 0.13 82);
  --warning-foreground: oklch(0.2 0.04 82);

  --border: oklch(0.285 0.012 195);
  --input: oklch(0.31 0.013 195);
  --ring: oklch(0.74 0.10 195);

  --brand-purple: #9b6fc4;
  --brand-purple-600: #8a5bb8;
  --brand-purple-700: #7a4aa8;
  --brand-purple-foreground: oklch(0.18 0.03 300);
}
```

- [ ] **Step 2: Swap the font tokens inside the existing `@theme` block**

Still in `src/app/globals.css`, inside the existing `@theme { … }` block, find these two lines:

```css
  --font-display: "Bitter", Georgia, serif;
  --font-body:    "Lexend", system-ui, sans-serif;
```

Replace them with:

```css
  --font-display: "Bricolage Grotesque", "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Hanken Grotesk", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", "Menlo", monospace;
```

(These are fallback stacks only — `layout.tsx` step 4 below makes `next/font` override them at the `<html>` level with the actual optimized fonts, exactly like the existing Bitter/Lexend setup already does. Do not remove `--spacing-section` or any `--color-*` line in this `@theme` block — Global Constraint 2.)

- [ ] **Step 3: Port the base-layer utility classes and hover classes**

Still in `globals.css`, inside the existing `@layer base { … }` block, find:

```css
  body {
    background-color: var(--color-surface);
    color: var(--color-ink);
    font-family: var(--font-body);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
```

Leave this exact rule in place (it still styles legacy pages until Task 10). Immediately after the closing `}` of the whole `@layer base { … }` block, add a new layer:

```css
@layer utilities {
  /* Money & figures: tabular, lined up like a ledger. */
  .tabular {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum" 1, "ss01" 1;
  }

  /* Small tracked labels — the "statement caption" voice. */
  .eyebrow {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: var(--tracking-eyebrow);
    font-size: var(--text-2xs);
    font-weight: var(--weight-medium);
  }

  /* Readable status text from a single --tone, keeping the hue true. */
  .text-tone {
    color: light-dark(
      color-mix(in oklch, var(--tone) 72%, black),
      color-mix(in oklch, var(--tone) 82%, white)
    );
  }

  @keyframes anchor-rise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: none; }
  }

  .animate-rise {
    animation: anchor-rise var(--duration-slow) var(--ease-out-expo) both;
    animation-delay: calc(var(--i, 0) * var(--stagger-step));
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-rise {
      animation-duration: 0.01ms;
      animation-delay: 0ms;
    }
  }

  /* ---- Hover classes replacing the design tool's style-hover attr ---- */
  .nav-link:hover {
    background: var(--accent);
    color: var(--accent-foreground);
  }

  .signin-link:hover {
    color: var(--foreground);
  }

  .link-underline:hover {
    text-decoration: underline;
  }

  .card-hover {
    transition: transform var(--duration-base) var(--ease-out-expo),
      box-shadow var(--duration-base) var(--ease-out-expo),
      border-color var(--duration-base) var(--ease-out-expo);
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px oklch(0.2 0.02 195 / 0.10);
    border-color: color-mix(in oklch, var(--primary) 30%, var(--border));
  }

  /* ---- Button (used by the "Get started" nav CTA, hero CTAs, etc.) ---- */
  .anc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    white-space: nowrap;
    font-family: var(--font-sans);
    font-weight: var(--weight-medium);
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    cursor: pointer;
    user-select: none;
    transition: background-color var(--duration-fast) var(--ease-out-quart),
      color var(--duration-fast) var(--ease-out-quart),
      opacity var(--duration-fast) var(--ease-out-quart);
    outline: none;
    background: var(--primary);
    color: var(--primary-foreground);
  }
  .anc-btn:hover {
    background: color-mix(in oklch, var(--primary) 90%, black);
  }
  .anc-btn:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 45%, transparent);
  }

  /* ---- Input (used by the get-started form, Task 9) ---- */
  .anc-input {
    outline: none;
    transition: border-color var(--duration-fast) var(--ease-out-quart),
      box-shadow var(--duration-fast) var(--ease-out-quart);
  }
  .anc-input::placeholder {
    color: var(--muted-foreground);
  }
  .anc-input:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 45%, transparent);
  }
  .anc-input:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
}
```

- [ ] **Step 4: Swap the font loaders in `layout.tsx`**

Open `src/app/layout.tsx`. Replace:

```tsx
import { Bitter, Lexend } from "next/font/google";
```

with:

```tsx
import { Bricolage_Grotesque, Hanken_Grotesk, Geist_Mono } from "next/font/google";
```

Replace:

```tsx
const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
```

with:

```tsx
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```

Replace the `<html>` line:

```tsx
    <html lang="en" className={`${bitter.variable} ${lexend.variable}`}>
```

with:

```tsx
    <html lang="en" className={`${bricolageGrotesque.variable} ${hankenGrotesk.variable} ${geistMono.variable}`}>
```

Leave `<body className="flex min-h-screen flex-col bg-surface antialiased">`, `<Nav />`, `<main>`, and `<Footer />` untouched — Task 3 changes those. Leave `metadata` untouched — Task 3 updates it.

- [ ] **Step 5: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds (this compiles every existing page against the modified `globals.css`/`layout.tsx` — a failure here means Step 1–4 broke an existing consumer; re-check that no legacy `--color-*` line or `--spacing-section` was removed).

Run: `npm run dev`, open `http://localhost:3000` in a browser.
Expected: the existing (not-yet-redesigned) home page still renders with correct colors (purple/amber — unchanged, since legacy tokens are untouched) but now in the new Bricolage/Hanken typefaces instead of Bitter/Lexend. This is the expected, accepted transitional look (Global Constraint 2).

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "Add ledger-teal design tokens and swap in Bricolage/Hanken/Geist fonts"
```

---

### Task 2: `Icon` and `Money` primitives

**Files:**
- Create: `src/components/ui/icon.tsx`
- Create: `src/components/ui/money.tsx`

**Interfaces:**
- Consumes: `var(--font-mono)`, `var(--muted-foreground)`, `var(--foreground)`, `var(--text-display)`, `var(--tracking-tight)` from Task 1; `lucide-react` (existing dependency).
- Produces: `Icon` — `{ name: IconName; size?: number; className?: string; style?: React.CSSProperties }`, default export none (named export `Icon`, plus exported type `IconName`). `Money` — `{ value: number; size?: "lg" | "display"; className?: string; style?: React.CSSProperties }`, named export `Money`. Every page task (4–9) imports both from `@/components/ui/icon` and `@/components/ui/money`.

- [ ] **Step 1: Create the `Icon` component**

Create `src/components/ui/icon.tsx`:

```tsx
import type { CSSProperties } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Lock,
  Plus,
  ReceiptText,
  RotateCw,
  ShieldCheck,
  Smartphone,
  UserPlus,
  Users,
  WalletMinimal,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "arrow-down-left"
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "check-circle"
  | "clock"
  | "eye"
  | "file-text"
  | "lock"
  | "plus"
  | "receipt-text"
  | "rotate-cw"
  | "shield-check"
  | "smartphone"
  | "user-plus"
  | "users"
  | "wallet-minimal";

const ICONS: Record<IconName, LucideIcon> = {
  "arrow-down-left": ArrowDownLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  check: Check,
  "check-circle": CheckCircle,
  clock: Clock,
  eye: Eye,
  "file-text": FileText,
  lock: Lock,
  plus: Plus,
  "receipt-text": ReceiptText,
  "rotate-cw": RotateCw,
  "shield-check": ShieldCheck,
  smartphone: Smartphone,
  "user-plus": UserPlus,
  users: Users,
  "wallet-minimal": WalletMinimal,
};

export function Icon({
  name,
  size = 24,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const LucideComponent = ICONS[name];
  return <LucideComponent size={size} strokeWidth={2} className={className} style={style} />;
}
```

- [ ] **Step 2: Create the `Money` component**

Create `src/components/ui/money.tsx`:

```tsx
import type { CSSProperties } from "react";

const MONEY_SIZES: Record<"lg" | "display", { integer: string; minor: string }> = {
  lg: { integer: "1.875rem", minor: "1.125rem" }, // ~30px / 18px
  display: { integer: "var(--text-display)", minor: "1.5rem" }, // 56px / 24px
};

function formatKwachaParts(value: number): { whole: string; decimal: string } {
  const fixed = value.toFixed(2);
  const [wholePart, decimalPart] = fixed.split(".");
  const whole = Number(wholePart).toLocaleString("en-US");
  return { whole, decimal: decimalPart };
}

export function Money({
  value,
  size = "lg",
  className,
  style,
}: {
  value: number;
  size?: "lg" | "display";
  className?: string;
  style?: CSSProperties;
}) {
  const { whole, decimal } = formatKwachaParts(value);
  const sizes = MONEY_SIZES[size];

  return (
    <span
      className={`tabular${className ? ` ${className}` : ""}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: "var(--tracking-tight)",
        color: "var(--foreground)",
        ...style,
      }}
    >
      <span style={{ fontSize: sizes.minor, color: "var(--muted-foreground)", fontWeight: 600 }}>K</span>
      <span style={{ fontSize: sizes.integer }}>{whole}</span>
      <span style={{ fontSize: sizes.minor, color: "var(--muted-foreground)", fontWeight: 600 }}>.{decimal}</span>
    </span>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors (in particular, no "unused export" warnings — both are unused until Task 4, which is fine for a foundation task).

Run: `npm run build`
Expected: succeeds.

Temporarily verify `Money`'s formatting by adding `<Money value={24150} size="display" />` and `<Money value={3200} size="lg" />` to the bottom of `src/app/page.tsx` (the current home page), running `npm run dev`, confirming the browser shows `K24,150.00` (large, stepped-down `K`/decimals) and `K3,200.00` (smaller), then **remove** that temporary snippet before committing (Task 4 is where `Money` actually gets used on the real page).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/icon.tsx src/components/ui/money.tsx
git commit -m "Add Icon and Money design-system primitives"
```

---

### Task 3: Shared shell — Nav, Footer, root layout

**Files:**
- Modify: `src/components/nav.tsx` (full rewrite)
- Modify: `src/components/footer.tsx` (full rewrite)
- Modify: `src/app/layout.tsx` (metadata only — fonts already done in Task 1)

**Interfaces:**
- Consumes: design tokens + hover classes from Task 1 (`var(--background)`, `var(--border)`, `var(--accent)`, `.nav-link`, `.signin-link`, `.anc-btn`); `public/mark-purple.png`, `public/wordmark-purple.png` (already staged in the repo).
- Produces: nothing new consumed by later tasks — Nav/Footer are leaves, rendered once by `layout.tsx` and wrapping every route. Every page task (4–9) is written assuming this Nav/Footer already wraps it (no per-page nav/footer markup — the source `.dc.html` files repeat the nav/footer on every page; the plan does **not** — it is componentized here once).

- [ ] **Step 1: Rewrite `src/components/nav.tsx`**

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/product", label: "Product" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in oklch, var(--background) 85%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-6 px-6"
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <Image src="/mark-purple.png" alt="Anchor mark" width={30} height={30} style={{ width: 30, height: 30, objectFit: "contain" }} />
          <Image src="/wordmark-purple.png" alt="anchor" width={90} height={17} style={{ height: 17, width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="nav-link"
                style={{
                  padding: "7px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                  background: active ? "var(--accent)" : "transparent",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/get-started"
            className="signin-link"
            style={{ fontSize: 14, fontWeight: 500, color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="anc-btn"
            style={{ height: 38, padding: "0 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-md"
              style={{ color: "var(--muted-foreground)" }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              className="fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              style={{ background: "oklch(0.245 0.018 195 / 0.4)" }}
            />
            <Dialog.Content
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300"
              style={{ background: "var(--background)" }}
            >
              <div className="flex h-16 items-center justify-between px-5" style={{ borderBottom: "1px solid var(--border)" }}>
                <Link href="/" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Image src="/mark-purple.png" alt="Anchor mark" width={28} height={28} style={{ width: 28, height: 28, objectFit: "contain" }} />
                  <Image src="/wordmark-purple.png" alt="anchor" width={80} height={15} style={{ height: 15, width: "auto", objectFit: "contain" }} />
                </Link>
                <Dialog.Close asChild>
                  <button
                    className="h-9 w-9 flex items-center justify-center rounded-md"
                    style={{ color: "var(--muted-foreground)" }}
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {links.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm"
                      style={{
                        fontWeight: active ? 600 : 500,
                        color: active ? "var(--foreground)" : "var(--muted-foreground)",
                        background: active ? "var(--accent)" : "transparent",
                      }}
                    >
                      {label}
                    </Link>
                  );
                })}
                <Link
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm"
                  style={{ fontWeight: 500, color: "var(--muted-foreground)" }}
                >
                  Sign in
                </Link>
              </nav>

              <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
                <Link
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  className="anc-btn flex h-11 w-full"
                  style={{ borderRadius: 10, fontSize: 14, fontWeight: 600 }}
                >
                  Get started
                </Link>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/footer.tsx`**

Replace the entire file with:

```tsx
import Link from "next/link";

const product = [
  { href: "/product", label: "How it works" },
  { href: "/who-its-for", label: "Who it's for" },
  { href: "/pricing", label: "Pricing" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/get-started", label: "Get started" },
];

export function Footer() {
  return (
    <footer style={{ background: "oklch(0.165 0.012 195)", color: "oklch(0.94 0.008 195)" }}>
      <div className="max-w-[1120px] mx-auto px-6" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12"
          style={{ paddingBottom: 40, borderBottom: "1px solid oklch(0.285 0.012 195)" }}
        >
          <div className="flex flex-col gap-3.5">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "#9b6fc4" }}>
              anchor
            </span>
            <p style={{ margin: 0, maxWidth: 300, fontSize: 14, lineHeight: 1.6, color: "oklch(0.72 0.013 195)" }}>
              Payroll that pays your people on their phones. Made in Lusaka, Zambia.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.013 195)",
                marginBottom: 4,
              }}
            >
              Product
            </span>
            {product.map(({ href, label }) => (
              <Link key={href} href={href} className="link-underline" style={{ fontSize: 14, color: "oklch(0.94 0.008 195)", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-2.5">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.72 0.013 195)",
                marginBottom: 4,
              }}
            >
              Company
            </span>
            {company.map(({ href, label }) => (
              <Link key={href} href={href} className="link-underline" style={{ fontSize: 14, color: "oklch(0.94 0.008 195)", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4" style={{ paddingTop: 24 }}>
          <span style={{ fontSize: 13, color: "oklch(0.72 0.013 195)" }}>© 2026 Anchor · Automated Money Solutions</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update root metadata in `src/app/layout.tsx`**

Replace the `metadata` export:

```tsx
export const metadata: Metadata = {
  title: {
    default: "Anchor Payroll | Payroll and Mobile Money Payments in One System",
    template: "%s | Anchor Payroll",
  },
  description:
    "Anchor is a secure payroll distribution platform that helps Zambian employers calculate payroll, pay workers via mobile money, and maintain compliant employee records — all in one place.",
  keywords: ["payroll", "mobile money", "Zambia", "MTN", "Airtel", "Zamtel", "NAPSA", "NHIMA"],
};
```

with:

```tsx
export const metadata: Metadata = {
  title: {
    default: "Anchor | Payroll on mobile money, for Zambia",
    template: "%s | Anchor",
  },
  description:
    "Anchor gives your business a payroll wallet. Add your people, top it up, and pay everyone on a schedule or whenever the work is done — every payment lands on a phone, with proof.",
  keywords: ["payroll", "mobile money", "Zambia", "MTN", "Airtel", "Zamtel", "wallet", "disbursement"],
};
```

Leave everything else in `layout.tsx` untouched (the `<Nav />`/`<Footer />` wiring already exists and needs no change — only the components themselves changed).

- [ ] **Step 4: Verify**

Run: `npm run lint` — expected clean.
Run: `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000`.
Expected: every route (old and new) now renders the new sticky, blurred, teal-accented nav with "Product / Who it's for / Pricing / About" + "Sign in" + "Get started", and the new dark-teal footer with the purple "anchor" wordmark. `/get-started` will 404 until Task 9 — that is expected at this point in the branch; do not treat it as a failure.
Resize to a mobile viewport (375px) and confirm the hamburger menu opens, lists the four links + Sign in, and shows the "Get started" button — confirm no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/nav.tsx src/components/footer.tsx src/app/layout.tsx
git commit -m "Rebuild nav and footer for the ledger-teal redesign"
```

---

### Task 4: Home page (`/`)

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Icon`/`IconName` and `Money` from Task 2, tokens/hover classes from Task 1, `Nav`/`Footer` (already wired in `layout.tsx` by Task 3 — do not render them here).
- Produces: nothing consumed by later tasks (a leaf page). Once this lands, `src/components/disbursement-card.tsx` and `src/components/scroll-reveal.tsx` become unused — **do not delete them here**; Task 10 removes now-dead files in one place.

**Full source:** `docs/design-reference/website/home.dc.html`. Read it alongside this task — the table below gives every section's exact copy and structure; the file gives the exact original markup order and inline-style values for anything not called out explicitly.

- [ ] **Step 1: Add the page metadata and static structure**

Replace the entire contents of `src/app/page.tsx`. Start with:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Money } from "@/components/ui/money";

export const metadata: Metadata = { title: "Pay your team on mobile money" };
```

- [ ] **Step 2: Hero section — fully worked example (establishes the pattern for every remaining section)**

```tsx
export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)", background: "var(--card)" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        <div
          className="relative grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center max-w-[1120px] mx-auto px-6"
          style={{ paddingTop: 96, paddingBottom: 96 }}
        >
          <div>
            <p
              className="animate-rise"
              style={{ "--i": 0, margin: "0 0 18px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" } as React.CSSProperties}
            >
              Payroll · Mobile money · Zambia
            </p>
            <h1
              className="animate-rise"
              style={{
                "--i": 1,
                margin: "0 0 22px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(42px, 5vw, 66px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--foreground)",
              } as React.CSSProperties}
            >
              Pay your team straight to their{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>mobile money</span>.
            </h1>
            <p
              className="animate-rise"
              style={{ "--i": 2, margin: "0 0 32px", maxWidth: 480, fontSize: 18, lineHeight: 1.6, color: "var(--muted-foreground)" } as React.CSSProperties}
            >
              Anchor gives your business a payroll wallet. Add your people, top it up, and pay everyone on a schedule or whenever the work is done. Every payment lands on a phone, with proof.
            </p>
            <div className="animate-rise flex items-center gap-4" style={{ "--i": 3, marginBottom: 28 } as React.CSSProperties}>
              <Link href="/get-started" className="anc-btn" style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
                Create your account
                <Icon name="arrow-right" size={16} />
              </Link>
              <Link href="/product" className="link-underline" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 15, fontWeight: 500, color: "var(--foreground)", textDecoration: "none" }}>
                See how it works
              </Link>
            </div>
            <p className="animate-rise" style={{ "--i": 4, margin: 0, fontSize: 13, color: "var(--muted-foreground)" } as React.CSSProperties}>
              Free to set up · Live on MTN Mobile Money · Airtel &amp; Zamtel coming soon
            </p>
          </div>

          {/* Mock payroll run card */}
          <div className="animate-rise flex justify-end" style={{ "--i": 3 } as React.CSSProperties}>
            <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
              <div
                style={{
                  position: "absolute", top: -34, left: -60, zIndex: 2, transform: "rotate(-2deg)", width: 268,
                  background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
                  boxShadow: "0 12px 30px oklch(0.2 0.02 195 / 0.13)", padding: "14px 16px",
                  display: "flex", gap: 11, alignItems: "flex-start",
                }}
              >
                <span style={{ width: 34, height: 34, borderRadius: 10, background: "#FFCC00", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "oklch(0.32 0.06 90)", flexShrink: 0 }}>
                  <Icon name="smartphone" size={18} />
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>MTN MoMo · just now</span>
                  <span style={{ fontSize: 13, lineHeight: 1.45 }}>
                    You have received <strong className="tabular" style={{ fontFamily: "var(--font-mono)" }}>K3,200.00</strong> from Kalulu Trading Ltd.
                  </span>
                </div>
              </div>
              <span
                style={{
                  position: "absolute", bottom: -22, right: -16, zIndex: 2, transform: "rotate(2deg)",
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999,
                  background: "var(--foreground)", color: "var(--background)", fontSize: 13, fontWeight: 600,
                  boxShadow: "0 10px 24px oklch(0.2 0.02 195 / 0.18)",
                }}
              >
                <Icon name="clock" size={14} />
                Next payroll · Fri 25 July
              </span>
              <div style={{ width: "100%", background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)", overflow: "hidden" }}>
                <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>Payroll run · 28 June</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "var(--success)", background: "color-mix(in oklch, var(--success) 14%, var(--card))" }}>
                    <Icon name="check-circle" size={13} />
                    Paid
                  </span>
                </div>
                <div style={{ padding: "14px 24px 18px" }}>
                  <Money value={24150} size="display" />
                  <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--muted-foreground)" }}>Paid to 9 people · MTN Mobile Money</p>
                </div>
                <div style={{ borderTop: "1px solid var(--border)" }}>
                  {[
                    { name: "Chanda Mwila", ref: "MTN ···· 4821", amount: "K3,200.00" },
                    { name: "Grace Tembo", ref: "MTN ···· 7743", amount: "K2,850.00" },
                    { name: "Joseph Banda", ref: "MTN ···· 1108", amount: "K2,400.00" },
                  ].map((row, i, arr) => (
                    <div
                      key={row.name}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "13px 24px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{row.name}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted-foreground)" }}>{row.ref}</span>
                      </div>
                      <span className="tabular" style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600 }}>{row.amount}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "12px 24px", background: "var(--muted)", display: "flex", alignItems: "center", gap: 8, color: "var(--muted-foreground)" }}>
                  <Icon name="receipt-text" size={14} />
                  <span style={{ fontSize: 12.5 }}>A payment record was sent to every person.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Remaining sections — copy and structure table**

Continue the same `<section>...</section>` pattern (per Global Constraint 5's conversion rules) for each of the following, reading `docs/design-reference/website/home.dc.html` for the exact original inline-style values (colors, radii, shadows already established in Step 2 — reuse the same values for the same visual elements). Every heading/paragraph/list item below is verbatim — do not paraphrase.

| # | Section | Background | Layout | Content |
|---|---|---|---|---|
| 1 | How it works | `var(--background)` (default) | Eyebrow "How it works" + `<h2>` "From a list of names to **everyone paid**, in four steps." (the bolded/underline-highlight span wraps "everyone paid" using the same `boxShadow` trick as the hero) + `grid grid-cols-1 md:grid-cols-4 gap-5` of 4 cards, each: step number (`01`–`04`, mono, muted), `Icon` (`user-plus`/`wallet-minimal`/`clock`/`check-circle`, size 22, `color: var(--primary)`), `<h3>` title, `<p>` body. Card class: `card-hover`, `border: 1px solid var(--border)`, `background: var(--card)`, `borderRadius: 16`, `padding: 24`. Cards: (1) "Add your people" / "A name, a phone number, and what you pay them. That's the whole setup." (2) "Top up your wallet" / "One transfer covers the whole payroll. Your money sits safely until you say pay." (3) "Run payroll your way" / "Set a payday and Anchor runs it for you, or pay at will when the work is done." (4) "Everyone gets paid" / "Money lands on each person's phone in minutes, with a record you can both point to." |
| 2 | Two ways to pay | `var(--card)`, border-top + border-bottom `1px solid var(--border)` | Eyebrow "Two ways to pay" + `<h2>` "Payroll that fits how you actually work." + `grid grid-cols-1 md:grid-cols-2 gap-5` of 2 cards (`background: var(--background)`, `card-hover`, `padding: 32`). Card 1: `Icon name="rotate-cw"` + eyebrow "On a schedule" + `<h3>` "Set payday once. Anchor remembers." + "Pick the day: end of the month, every Friday, whatever your rhythm is. Anchor prepares the run, shows you the total, and pays everyone on time. You just keep the wallet topped up." Card 2: `Icon name="arrow-up-right"` + eyebrow "At will" + `<h3>` "Work done today, paid today." + "Casual crews, piece work, one-off jobs: pick the people, confirm the amounts, and pay on the spot. No schedule needed, no waiting for month-end." |
| 3 | Wallet | `var(--background)` (default) | `grid grid-cols-1 md:grid-cols-2 gap-16 items-center`. Left: eyebrow "The wallet" + `<h2>` "One balance. Every payday covered." + body "Your Anchor wallet is where payroll money waits, separate from your trading cash, so payday never catches you off guard. Top it up when it suits you, and see exactly where every kwacha went." + 3 checklist items (`Icon name="check"`/`"check"`/`"file-text"`, `color: var(--success)`): "Nothing moves until you approve it. Your money is yours." / "Anchor tells you if the balance won't cover the next run." / "A clean statement of every top-up and payout, ready to export." Right: a `surface-raised` card — eyebrow "Available balance", `<Money value={38400} size="display" />`, two buttons ("Add funds" with `Icon name="plus"`, primary `.anc-btn`; "Statement", outline style: `border: 1px solid var(--border)`, `background: var(--card)`), then an activity list: eyebrow "Wallet activity", row 1 `Icon name="arrow-down-left"` (`color: var(--success)`) "Top up · bank transfer" → `+K20,000.00` (`className="tabular text-tone"`, `style={{ "--tone": "var(--success)" } as React.CSSProperties}`), row 2 `Icon name="arrow-up-right"` (`color: var(--muted-foreground)`) "Payroll run · June" → `−K24,150.00` (plain tabular, no tone). |
| 4 | Networks | `var(--card)`, border-top + border-bottom | `grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-center`. Left: eyebrow "Networks" + `<h2>` "MTN today. Every network soon." + body "We're starting where most of Zambia gets paid. Airtel Money and Zamtel Kwacha are on the way. Your employee list won't change, only where the money can land." Right: `grid grid-cols-1 md:grid-cols-3 gap-4` of 3 network cards (`background: var(--background)`, `padding: 22`, `borderRadius: 16`): (1) solid `1px solid var(--border)`, dot `#FFCC00`, "MTN Mobile Money", pill `Icon name="check-circle"` "Live now" (`color: var(--success)`, bg `color-mix(in oklch, var(--success) 14%, var(--card))`). (2) dashed border, dot `#E4002B` at `opacity:0.45`, "Airtel Money" (muted), pill `Icon name="clock"` "Coming soon" (muted, `background: var(--muted)`). (3) dashed border, dot `#00A651` at `opacity:0.45`, "Zamtel Kwacha" (muted), same "Coming soon" pill. |
| 5 | Who it's for | `var(--background)` (default) | Eyebrow "Who it's for" + `<h2>` "If you pay people, Anchor is for you." + `grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-5`. Card 1 (dark): `background: var(--foreground)`, `color: var(--background)`, `borderRadius: 16`, `padding: 40` — eyebrow "Small & medium businesses" (color `color-mix(in oklch, var(--background) 65%, transparent)`) + `<h3>` "Retire the payday spreadsheet." + body "Shops, farms, workshops, agencies. Whether you pay five people or three hundred, stop sending money one number at a time and reconciling it by hand at month-end." + link "See how SMEs use Anchor" (`Icon name="arrow-right"` size 15, `color: var(--background)`) → `/who-its-for`. Card 2 (light): `background: var(--card)`, `border: 1px solid var(--border)` — eyebrow "Individuals" + `<h3>` "For the people you employ at home." + body "A gardener, a nanny, a small building crew. Pay them reliably every month, with a record both of you can trust." + link "See how individuals use Anchor" (`color: var(--primary)`) → `/who-its-for`. |
| 6 | Founding CTA | `var(--card)`, border-top | `grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center`. Left: eyebrow "Early access" + `<h2>` "Become a **founding customer**." (highlight span on "founding customer") + body "Anchor is new, and we're building it with the businesses that join first. Founding customers get a direct line to our team in Lusaka, and a say in what we build next." Right (`flex flex-col items-start gap-3.5`): primary button "Create your account" (`Icon name="arrow-right"`) → `/get-started`; text link "Or talk to us about pricing first" → `/pricing`. |

- [ ] **Step 4: Close the component**

```tsx
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint` — expected clean (in particular: no unused imports — `Icon`/`Money`/`Link` must all be used).
Run: `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000`.
Expected: hero renders with the floating MTN notification + "Next payroll" pill + payroll-run card showing `K24,150.00`; all 6 sections below render in order with the exact copy from the table; at a 375px viewport every grid collapses to one column and the mock cards don't overflow.
Compare every heading/paragraph against `docs/design-reference/website/home.dc.html` for exact wording.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "Rebuild home page with the ledger-teal redesign"
```

---

### Task 5: Product page (`/product`)

**Files:**
- Modify: `src/app/product/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Icon`, `Money`, tokens/hover classes, `Link` — same as Task 4.
- Produces: nothing consumed by later tasks.

**Full source:** `docs/design-reference/website/product.dc.html`.

- [ ] **Step 1: Metadata and page hero — fully worked example**

Replace the entire contents of `src/app/product/page.tsx`:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { Money } from "@/components/ui/money";

export const metadata: Metadata = { title: "Product" };

export default function ProductPage() {
  return (
    <div>
      {/* Page hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        <div className="relative max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Product
          </p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 640 }}>
            Everything payday needs, in{" "}
            <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>one place</span>.
          </h1>
          <p style={{ margin: 0, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            A list of your people, a wallet that funds them, and two ways to run the payment. That's Anchor. Here's each piece.
          </p>
        </div>
      </section>
```

- [ ] **Step 2: Remaining sections — copy and structure table**

| # | Section | Background | Layout | Content |
|---|---|---|---|---|
| 1 | Employees | `var(--background)` | `grid grid-cols-1 md:grid-cols-2 gap-16 items-center` | Left: eyebrow "Your people" + `<h2>` "One list, always ready to pay." + body "Add each person once: their name, mobile money number, and what you pay them. Full-time staff, casual workers, or a mix. When it's time to pay, the list is the payroll." + 3 checklist items (`Icon name="check"`, `color: var(--success)`): "Fixed salaries or per-job amounts. Set what fits each person." / "Anchor checks the number is a valid mobile money account before you pay." / "Pause someone for a month without deleting them." Right: a `surface-raised` employee-list card — header "Employees · 9" (mono eyebrow) + "Add person" (`Icon name="user-plus"` size 14, `color: var(--primary)`) — then 3 rows, each: initials avatar (`background: var(--secondary)`, `color: var(--secondary-foreground)`, 34px circle) + name + role, and amount right-aligned (`tabular`, mono, 14px, weight 600): "Chanda Mwila" / "Shopkeeper · monthly" / `K3,200.00`; "Grace Tembo" / "Accounts · monthly" / `K2,850.00`; "Joseph Banda" / "Driver · per job" / `K400.00`. |
| 2 | Running payroll | `var(--card)`, border-top + border-bottom | Eyebrow "Running payroll" + `<h2>` "Review it, run it, done." (maxWidth 560) + body "Before any money moves, Anchor shows you the whole run: who's being paid, how much, and what it totals. You approve it; we handle the rest." + `grid grid-cols-1 md:grid-cols-3 gap-5` of 3 `card-hover` cards (`background: var(--background)`, `border: 1px solid var(--border)`, `padding: 28`): (1) `Icon name="rotate-cw"` size 22 + "Automatic runs" + "Set your payday and Anchor prepares the run each cycle. You get a reminder to review and approve. Nothing pays out on its own." (2) `Icon name="arrow-up-right"` + "At-will payments" + "Pick anyone on your list and pay them now, for a finished job, an advance, or a one-off. Same proof, same record." (3) `Icon name="eye"` + "Live status" + "Watch each payment land as it happens. If one fails (a wrong number, a full wallet) you'll see it named, with a retry." |
| 3 | Proof of payment | `var(--background)` | `grid grid-cols-1 md:grid-cols-2 gap-16 items-center` (card comes first in source order, order-1/order-2 — in JSX just place the card `<div>` first, then the copy `<div>`, matching visual left/right without needing an `order` property) | Card (`surface-raised`, `maxWidth: 380`, `padding: 24`): green "Payment confirmed" row (`Icon name="check-circle"`, `color: var(--success)`) + `<Money value={3200} size="lg" />` + a bordered-top detail block: "To: Chanda Mwila · MTN ···· 4821" / "From: Kalulu Trading Ltd" / "28 June 2026 · 09:14 · Ref ANC-4471". Copy: eyebrow "Proof of payment" + `<h2>` "A record both sides can point to." + body "Every payment creates a record: who, how much, when, and the reference. Your employee gets confirmation on their phone; you get a history you can search and export. No more "did you send it?" conversations." (use real curly quotes: “did you send it?”). |
| 4 | Money safety | `var(--card)`, border-top | Eyebrow "Your money" (maxWidth 620) + `<h2>` "Nothing moves without you." + body "Anchor is built like a ledger, not a black box. Your wallet balance is yours, every movement is recorded, and no payment leaves without your approval." + `grid grid-cols-1 md:grid-cols-3 gap-5` of 3 `card-hover` cards (`background: var(--background)`, `padding: 24`): (1) `Icon name="lock"` size 20 + "You approve every run" + "Scheduled or at will, a payment only goes out after you've reviewed and confirmed it." (2) `Icon name="shield-check"` + "Your balance is ring-fenced" + "Wallet funds are held for payroll and nothing else. Withdraw them back to your account any time." (3) `Icon name="file-text"` + "Everything is on the record" + "Every top-up, payout, and retry is logged with a reference, exportable whenever you need it." |
| 5 | CTA band | default, border-top | `flex items-center justify-between gap-8` | `<h2>` "Ready to run your first payroll?" + primary button "Create your account" (`Icon name="arrow-right"`) → `/get-started`. |

- [ ] **Step 3: Close the component**

```tsx
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint` && `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000/product`.
Expected: hero + 5 sections render in order with exact copy (including the curly-quoted "did you send it?"); employee list shows the 3 named rows with correct amounts; proof card shows `K3,200.00` and the exact receipt detail lines; mobile viewport collapses every 2/3-column grid to one column.

- [ ] **Step 5: Commit**

```bash
git add src/app/product/page.tsx
git commit -m "Rebuild product page with the ledger-teal redesign"
```

---

### Task 6: Who it's for page (`/who-its-for`)

**Files:**
- Modify: `src/app/who-its-for/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Icon`, tokens/hover classes, `Link` — same as Task 4/5. (No `Money` usage on this page.)
- Produces: nothing consumed by later tasks.

**Full source:** `docs/design-reference/website/who-its-for.dc.html`.

- [ ] **Step 1: Metadata and page hero**

Replace the entire contents of `src/app/who-its-for/page.tsx`:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "Who it's for" };

export default function WhoItsForPage() {
  return (
    <div>
      {/* Page hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--border) 55%, transparent) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        <div className="relative max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 64 }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
            Who it's for
          </p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: 640 }}>
            Built for how{" "}
            <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>Zambia pays people</span>.
          </h1>
          <p style={{ margin: 0, maxWidth: 540, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
            Most wages here land on a phone, not in a bank account. Anchor is made for the businesses and people who pay that way.
          </p>
        </div>
      </section>
```

- [ ] **Step 2: SMEs and Individuals sections — copy and structure table**

Both sections share one layout: `grid grid-cols-1 md:grid-cols-2 gap-16 items-start` — left column is eyebrow + `<h2>` + one paragraph; right column is a `flex flex-col gap-4` stack of 3 `card-hover` rows, each `display: flex; gap: 14px`, an `Icon` (`color: var(--primary)`, `marginTop: 2`), and a `<h3>`/`<p>` pair.

| # | Section | Background | Left column | Right column (3 rows: icon / title / body) |
|---|---|---|---|---|
| 1 | SMEs | `var(--background)` | Eyebrow "Small & medium businesses" + `<h2>` "Payday without the payday panic." + "If you run a shop, a farm, a workshop, or an agency, payday probably means a spreadsheet, a stack of phone numbers, and an evening of sending money one transfer at a time. Anchor turns that into one reviewed, approved run, and keeps the record for you." | Rows use `background: var(--card)`, `border: 1px solid var(--border)`, `padding: 20px 24px`. (1) `Icon name="users"` size 20 / "Five people or three hundred, mixed pay" / "Salaried staff and casual workers on the same list, each paid their own way." (2) `Icon name="rotate-cw"` / "Month-end runs itself" / "Set the payday once. Review the run, approve it, and get your evening back." (3) `Icon name="file-text"` / "Records that defend you" / "A dispute, an audit, a partner asking questions? The payment history answers for you." |
| 2 | Individuals | `var(--card)`, border-top + border-bottom | Eyebrow "Individuals & households" + `<h2>` "The people who keep your home running deserve a proper payday too." + "A gardener, a nanny, a guard, a small crew fixing the roof. Anchor gives them a reliable payday and a payment history, and gives you one place to manage it all, instead of remembering who was paid what, and when." | Rows use `background: var(--background)`, `border: 1px solid var(--border)`, `padding: 20px 24px`. (1) `Icon name="clock"` size 20 / "Never miss the day" / "Set it monthly and it happens, even when you're travelling or busy." (2) `Icon name="smartphone"` / "No cash handovers" / "Money goes straight to their phone. No envelopes, no change, no doubt." (3) `Icon name="receipt-text"` / "Dignity in the record" / "A payment history helps the people who work for you prove their income." |

Then the CTA band (default background, `flex items-center justify-between gap-8`): `<h2>` "Sound like you? Start with your first payday." + primary button "Create your account" (`Icon name="arrow-right"`) → `/get-started`.

- [ ] **Step 3: Close the component**

```tsx
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint` && `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000/who-its-for`.
Expected: hero + SMEs + Individuals + CTA render in order with exact copy; each 2-column split collapses to one column on mobile, with the 3-row card stack staying legible.

- [ ] **Step 5: Commit**

```bash
git add src/app/who-its-for/page.tsx
git commit -m "Rebuild who-its-for page with the ledger-teal redesign"
```

---

### Task 7: Pricing page (`/pricing`)

**Files:**
- Modify: `src/app/pricing/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Icon`, tokens/hover classes, `Link`.
- Produces: nothing consumed by later tasks.

**Full source:** `docs/design-reference/website/pricing.dc.html`.

- [ ] **Step 1: Full page**

Replace the entire contents of `src/app/pricing/page.tsx`:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div style={{ maxWidth: 620, marginBottom: 56 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Pricing
            </p>
            <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              We're setting pricing with our{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>founding customers</span>.
            </h1>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
              Anchor is in early access, and we'd rather price it with you than at you. Join now and you'll help shape a simple, per-payout price. Founding terms lock in before public pricing launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 880 }}>
            {/* Founding customer card */}
            <div
              className="flex flex-col gap-5"
              style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, padding: 36, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)" }}
            >
              <div>
                <p style={{ margin: "0 0 10px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
                  Founding customer
                </p>
                <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700 }}>Early access</h2>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>For SMEs and individuals joining now.</p>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Full product: wallet, scheduled and at-will payroll, records",
                  "Founding terms locked in before public pricing",
                  "A direct line to the team in Lusaka",
                  "A say in what we build next",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                    <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started"
                className="anc-btn"
                style={{ justifyContent: "center", height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: "auto" }}
              >
                Talk to us about joining
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>

            {/* What to expect card */}
            <div
              className="flex flex-col gap-5"
              style={{ background: "var(--card)", border: "1px dashed var(--border)", borderRadius: 16, padding: 36 }}
            >
              <div>
                <p style={{ margin: "0 0 10px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  Public pricing · coming soon
                </p>
                <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--muted-foreground)" }}>
                  What to expect
                </h2>
              </div>
              <div className="flex flex-col gap-4" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
                <p style={{ margin: 0 }}>Our promise when pricing lands:</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Simple and per-payout: you pay when you pay people",
                    "No monthly minimums for small teams",
                    "Every fee shown before you approve a run, no surprises",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Icon name="check" size={18} style={{ color: "var(--muted-foreground)", marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <p style={{ margin: "auto 0 0", fontSize: 13, color: "var(--muted-foreground)" }}>Founding customers will see it first.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint` && `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000/pricing`.
Expected: hero + two-card grid render; no fixed prices anywhere (this is intentional — early access positioning, not a pricing table); cards collapse to one column on mobile; "Talk to us about joining" routes to `/get-started`.

- [ ] **Step 3: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "Rebuild pricing page with the ledger-teal redesign"
```

---

### Task 8: About page (`/about`)

**Files:**
- Modify: `src/app/about/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Icon`, tokens/hover classes, `Link`.
- Produces: nothing consumed by later tasks.

**Full source:** `docs/design-reference/website/about.dc.html`.

- [ ] **Step 1: Full page**

Replace the entire contents of `src/app/about/page.tsx`:

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = { title: "About" };

const storyParagraphs = [
  "Anchor started with a simple observation: in Zambia, most people are paid onto their phones. But the tools employers use to pay them were built for banks, spreadsheets, and somewhere else entirely.",
  "So business owners spend payday evenings sending mobile money one number at a time, checking amounts against a spreadsheet, and hoping nothing slips. The people they pay wait, and wonder.",
  "We're building the payroll system that matches how money actually moves here: a wallet you control, a list of your people, and payments that land on phones with proof: automatically on payday, or the moment the work is done.",
];

const valueCards = [
  { eyebrow: "Where we are", title: "Made in Lusaka", body: "We're a Zambian team building for Zambian payrolls: the networks, the habits, the month-end realities." },
  { eyebrow: "Where we're at", title: "Early days, honestly", body: "This is version one. MTN payouts are live; Airtel and Zamtel are coming. We'd rather tell you that plainly than pretend otherwise." },
  { eyebrow: "How we work", title: "With our customers", body: "Founding customers talk directly to the people building Anchor. What you need next is what we build next." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div style={{ maxWidth: 640 }}>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              About
            </p>
            <h1 style={{ margin: "0 0 24px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Payday is a promise. We help you{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>keep it</span>.
            </h1>
            <div className="flex flex-col gap-4.5" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--muted-foreground)" }}>
              {storyParagraphs.map((p) => (
                <p key={p} style={{ margin: 0 }}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: 64 }}>
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="card-hover flex flex-col gap-2.5"
                style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 28 }}
              >
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
                  {card.eyebrow}
                </p>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600 }}>{card.title}</h2>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--muted-foreground)" }}>{card.body}</p>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between gap-8"
            style={{ marginTop: 64, padding: 40, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16 }}
          >
            <div>
              <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Want to talk to us?</h2>
              <p style={{ margin: 0, fontSize: 15, color: "var(--muted-foreground)" }}>We're happy to walk you through Anchor before you commit to anything.</p>
            </div>
            <Link
              href="/get-started"
              className="anc-btn"
              style={{ height: 46, padding: "0 22px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", flexShrink: 0 }}
            >
              Get in touch
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint` && `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000/about`.
Expected: hero + 3 story paragraphs + 3 value cards + contact CTA render in order with exact copy; value cards collapse to one column on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "Rebuild about page with the ledger-teal redesign"
```

---

### Task 9: Get started page (`/get-started`) + API route support

**Files:**
- Modify: `src/app/api/submit/route.ts` (add a new request-type branch)
- Modify: `.env.local.example` (document the new sheet tab)
- Create: `src/components/get-started-form.tsx` (client component, mirrors the existing `contact-form.tsx`/`demo-form.tsx` pattern)
- Create: `src/app/get-started/page.tsx` (server component: hero + benefits + renders the form)

**Interfaces:**
- Consumes: `Icon` (Task 2), tokens/hover classes including `.anc-btn`/`.anc-input` (Task 1). Existing `/api/submit` route contract: `POST` with JSON body `{ type: string, ...fields }`; honeypot field `honeypot` short-circuits to `{ ok: true }`; success → `{ ok: true }`; failure → `{ error: string }` with non-2xx status.
- Produces: the route now also accepts `type: "get-started"` with fields `name`, `business`, `phone`, `email`, `teamSize`, `honeypot` — appended to a new "Get Started" sheet tab with columns `Timestamp | Name | Business | Phone | Email | Team Size`. Every CTA across Tasks 4–8 already links to `/get-started` — this task is what makes that route exist and actually work.

**Full source:** `docs/design-reference/website/get-started.dc.html`. Note the reference file's "Thanks, we've got it" state and success copy — reproduce that exact copy in the client component below.

- [ ] **Step 1: Add the `get-started` branch to the submit route**

Open `src/app/api/submit/route.ts`. In the `POST` handler, after the existing `if (type === "contact") { … } else if (type === "demo") { … }` block, add a third branch **before** the final `else`:

```tsx
    } else if (type === "get-started") {
      await appendToSheet("Get Started", {
        Timestamp: timestamp,
        Name: fields.name ?? "",
        Business: fields.business ?? "",
        Phone: fields.phone ?? "",
        Email: fields.email ?? "",
        "Team Size": fields.teamSize ?? "",
      });
    } else {
```

The surrounding function signature, honeypot check, `appendToSheet` helper, and error handling are unchanged — this is an additive `else if` branch only. Also update the type annotation on the destructure line from:

```tsx
    const { type, ...fields } = body as { type: "contact" | "demo"; [k: string]: string };
```

to:

```tsx
    const { type, ...fields } = body as { type: "contact" | "demo" | "get-started"; [k: string]: string };
```

- [ ] **Step 2: Document the new sheet tab**

Open `.env.local.example`. Change line 5 from:

```
# 5. Create two sheets (tabs) inside the file: "Demo Requests" and "Contact"
```

to:

```
# 5. Create three sheets (tabs) inside the file: "Demo Requests", "Contact", and "Get Started"
```

And after the existing header-documentation line (`#    Contact:       Timestamp | Name | Email | Phone | Message`), add:

```
#    Get Started:   Timestamp | Name | Business | Phone | Email | Team Size
```

- [ ] **Step 3: Create the client form component**

Create `src/components/get-started-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

type Status = "idle" | "loading" | "success" | "error";

const teamSizes = ["Just 1 or 2", "3 – 10", "11 – 50", "More than 50"];

export function GetStartedForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const fd = new FormData(e.currentTarget);
    const data = {
      type: "get-started",
      name: fd.get("name") as string,
      business: fd.get("business") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      teamSize: fd.get("teamSize") as string,
      honeypot: fd.get("honeypot") as string,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Submission failed.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3.5" style={{ padding: "12px 0" }}>
        <span style={{ color: "var(--success)" }}>
          <Icon name="check-circle" size={32} />
        </span>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Thanks, we've got it.</h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
          We'll be in touch within one working day to set up your account and plan your first payroll. Nothing else is needed from you for now.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{ marginTop: 8, background: "none", border: "none", padding: 0, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, color: "var(--primary)", cursor: "pointer", textDecoration: "underline" }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
      {/* Honeypot */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gs-name" style={{ fontSize: 13.5, fontWeight: 600 }}>Your name</label>
        <input
          id="gs-name" name="name" type="text" required placeholder="e.g. Mutale Zulu" className="anc-input"
          style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gs-business" style={{ fontSize: 13.5, fontWeight: 600 }}>
          Business name <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}>(leave blank if it's just you)</span>
        </label>
        <input
          id="gs-business" name="business" type="text" placeholder="e.g. Kalulu Trading Ltd" className="anc-input"
          style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gs-phone" style={{ fontSize: 13.5, fontWeight: 600 }}>Phone</label>
          <input
            id="gs-phone" name="phone" type="tel" required placeholder="+260 ·· ··· ····" className="anc-input"
            style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gs-email" style={{ fontSize: 13.5, fontWeight: 600 }}>Email</label>
          <input
            id="gs-email" name="email" type="email" required placeholder="you@business.co.zm" className="anc-input"
            style={{ height: 44, padding: "0 14px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gs-size" style={{ fontSize: 13.5, fontWeight: 600 }}>How many people do you pay?</label>
        <select
          id="gs-size" name="teamSize" required className="anc-input"
          style={{ height: 44, padding: "0 10px", border: "1px solid var(--input)", borderRadius: 8, background: "var(--card)", fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--foreground)" }}
        >
          {teamSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p style={{ margin: 0, fontSize: 14, color: "var(--destructive-foreground)", background: "color-mix(in oklch, var(--destructive) 15%, var(--card))", border: "1px solid var(--destructive)", borderRadius: 8, padding: "12px 16px" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="anc-btn"
        style={{ height: 48, borderRadius: 10, fontSize: 15, fontWeight: 600, marginTop: 6, opacity: status === "loading" ? 0.6 : 1 }}
      >
        {status === "loading" ? "Submitting…" : "Create your account"}
      </button>
      <p style={{ margin: 0, fontSize: 12.5, color: "var(--muted-foreground)", textAlign: "center" }}>
        Your details stay with us. We'll only use them to set you up.
      </p>
    </form>
  );
}
```

- [ ] **Step 4: Create the page**

Create `src/app/get-started/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Icon } from "@/components/ui/icon";
import { GetStartedForm } from "@/components/get-started-form";

export const metadata: Metadata = { title: "Get started" };

const benefits = [
  "Free to set up. No card, no commitment",
  "We reply within one working day",
  "Founding-customer terms while we're in early access",
];

export default function GetStartedPage() {
  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)" }}>
      <section style={{ flex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1120px] mx-auto px-6" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--primary)" }}>
              Get started
            </p>
            <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px, 4vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Your first payday on Anchor is{" "}
              <span style={{ boxShadow: "inset 0 -0.3em color-mix(in oklch, var(--primary) 24%, transparent)" }}>closer than you think</span>.
            </h1>
            <p style={{ margin: "0 0 28px", fontSize: 17, lineHeight: 1.6, color: "var(--muted-foreground)" }}>
              Tell us a little about who you pay. We'll set up your account, walk you through your first payroll, and stay close while you get comfortable.
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {benefits.map((benefit) => (
                <li key={benefit} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15 }}>
                  <Icon name="check" size={18} style={{ color: "var(--success)", marginTop: 2 }} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border)", borderRadius: 16, padding: 36, boxShadow: "0 1px 2px oklch(0.2 0.02 195 / 0.06), 0 8px 24px oklch(0.2 0.02 195 / 0.07)" }}>
            <GetStartedForm />
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint` && `npm run build` — expected clean.
Run: `npm run dev`, open `http://localhost:3000/get-started`.
Expected: hero + benefits render on the left, form card on the right; mobile viewport stacks form below copy.
Fill the form and submit. **Without** `.env.local` configured, expect a graceful `{ error: "Submission failed. Please try again." }` surfaced in the red error box (this is correct behavior — the route's existing try/catch already handles missing Google credentials; do not treat this as a bug). If `.env.local` **is** configured with a real sheet that has a "Get Started" tab (headers: `Timestamp | Name | Business | Phone | Email | Team Size`), confirm a real row is appended and the success state ("Thanks, we've got it.") renders with the "Send another request" reset working.
Confirm every CTA built in Tasks 4–8 (`/`, `/product`, `/who-its-for`, `/pricing`, `/about`, plus nav "Sign in"/"Get started") now resolves instead of 404ing.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/submit/route.ts .env.local.example src/components/get-started-form.tsx src/app/get-started/page.tsx
git commit -m "Add get-started lead form, wired to the existing Google Sheet submit API"
```

---

### Task 10: Remove dropped pages, dead code, and legacy tokens; add redirects

**Files:**
- Delete: `src/app/security/`, `src/app/contact/`, `src/app/demo/`, `src/app/privacy/`, `src/app/terms/` (entire directories)
- Delete: `src/components/contact-form.tsx`, `src/components/demo-form.tsx`, `src/components/disbursement-card.tsx`, `src/components/scroll-reveal.tsx`
- Delete: `public/logo-mark.png`, `public/logo-full.png`, `public/logo-black.png`
- Modify: `next.config.ts` (add redirects)
- Modify: `src/app/globals.css` (remove the now-dead legacy `@theme` tokens)

**Interfaces:**
- Consumes: nothing new — this task only removes now-unreferenced code once Tasks 3–9 have replaced every consumer. Verified prior to this plan: `disbursement-card.tsx`/`scroll-reveal.tsx` were only imported by the old `src/app/page.tsx` (replaced in Task 4); `contact-form.tsx`/`demo-form.tsx` were only imported by their own now-deleted route pages; `logo-mark.png`/`logo-full.png`/`logo-black.png` were only referenced by the old `nav.tsx`/`footer.tsx` (rewritten in Task 3).
- Produces: nothing consumed by later tasks (this is the final task).

- [ ] **Step 1: Delete the dropped route directories**

```bash
git rm -r src/app/security src/app/contact src/app/demo src/app/privacy src/app/terms
```

- [ ] **Step 2: Delete the now-orphaned components**

```bash
git rm src/components/contact-form.tsx src/components/demo-form.tsx src/components/disbursement-card.tsx src/components/scroll-reveal.tsx
```

- [ ] **Step 3: Delete the now-unused legacy logo assets**

```bash
git rm public/logo-mark.png public/logo-full.png public/logo-black.png
```

- [ ] **Step 4: Add redirects for the dropped routes**

Replace the contents of `next.config.ts`:

```tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/contact", destination: "/get-started", permanent: true },
      { source: "/demo", destination: "/get-started", permanent: true },
      { source: "/security", destination: "/product", permanent: true },
      { source: "/privacy", destination: "/about", permanent: true },
      { source: "/terms", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 5: Remove the legacy design tokens from `globals.css`**

Open `src/app/globals.css`. In the `@theme { … }` block, delete these lines (every consumer was replaced or deleted in Tasks 3–9):

```css
  --color-brand:           oklch(0.50 0.22 292);
  --color-brand-mid:       oklch(0.44 0.22 292);
  --color-brand-deep:      oklch(0.24 0.16 292);

  --color-amber:           oklch(0.80 0.14 68);
  --color-amber-dark:      oklch(0.68 0.16 65);
  --color-amber-light:     oklch(0.96 0.04 68);

  --color-surface:         oklch(0.97 0.008 80);
  --color-surface-2:       oklch(0.93 0.009 80);
  --color-white:           oklch(0.99 0.004 80);

  --color-ink:             oklch(0.18 0.05 292);
  --color-ink-muted:       oklch(0.47 0.022 292);
  --color-ink-faint:       oklch(0.65 0.012 292);

  --color-border:          oklch(0.89 0.009 292);
  --color-border-strong:   oklch(0.82 0.013 292);

  /* ── Spacing ── */
  --spacing-section: 6rem;
```

and delete the now-unnecessary `/* — Text — brand-tinted neutrals — */`/`/* Warm cream surfaces */`/`/* Borders */`/`/* ── Brand colors — Anchor purple + warm amber accent ── */` comment lines that only labeled those deleted tokens. Also delete the now-dead `@layer base` rules that reference the deleted tokens:

```css
  ::selection {
    background-color: var(--color-brand);
    color: white;
  }
```

and update the `body` rule inside `@layer base` from:

```css
  body {
    background-color: var(--color-surface);
    color: var(--color-ink);
    font-family: var(--font-body);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
```

to:

```css
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    line-height: var(--leading-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
```

Leave the `animate-fade-up`/`animate-fade-in-right`/`bar-animate` keyframes and utilities alone only if anything still references them — grep first (`grep -rl "animate-fade-up\|animate-fade-in-right\|bar-animate" src/`); if nothing matches (expected, since Task 4 replaced the only consumer), delete those three `@keyframes` blocks and their `.animate-*`/`.bar-animate` utility classes too, including their `prefers-reduced-motion` override block.

- [ ] **Step 6: Verify**

Run: `grep -rn "logo-mark\|logo-full\|logo-black\|ContactForm\|DemoForm\|DisbursementCard\|ScrollReveal\|color-brand\|color-ink\|color-amber\|color-surface\|color-border\|spacing-section\|font-body" src/`
Expected: no matches (confirms nothing still references anything deleted in Steps 1–5).

Run: `npm run lint` — expected clean.
Run: `npm run build` — expected clean, and the build output's route list shows exactly: `/`, `/product`, `/who-its-for`, `/pricing`, `/about`, `/get-started`, `/api/submit` (no `/security`, `/contact`, `/demo`, `/privacy`, `/terms`).
Run: `npm run dev`. Visit `http://localhost:3000/contact`, `/demo`, `/security`, `/privacy`, `/terms` — each must redirect (307/308) to its mapped destination, not 404.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Remove dropped pages and legacy tokens; add redirects for old URLs"
```

---

## Self-Review

**Spec coverage:** every locked decision in `docs/superpowers/specs/2026-07-02-anchor-website-redesign-design.md` maps to a task — whole-site rebuild (Tasks 1–9), dropped pages + redirects (Task 10), light-mode-only (Task 1, no toggle anywhere), get-started as a real lead form wired to `/api/submit` (Task 9), design-system port including both `Icon` and `Money` primitives (Task 2), shared nav/footer (Task 3), fonts (Task 1). No spec section is unaddressed.

**Placeholder scan:** no TBD/TODO; every step has complete, runnable code or (for pages 4–8) a fully-specified copy/structure table plus one complete worked example establishing the transcription pattern, per the plan's own stated rationale (avoiding duplicating hundreds of lines of near-identical JSX per page while keeping every string of copy verbatim and unambiguous).

**Type consistency:** `IconName` (Task 2) is the single source of truth for icon names; every page task's `<Icon name="…">` calls use only names from that union (`arrow-down-left`, `arrow-right`, `arrow-up-right`, `check`, `check-circle`, `clock`, `eye`, `file-text`, `lock`, `plus`, `receipt-text`, `rotate-cw`, `shield-check`, `smartphone`, `user-plus`, `users`, `wallet-minimal` — all 17 accounted for, matching the verified lucide-react exports). `Money`'s `size` prop (`"lg" | "display"`) matches its only two call sites (Task 4 hero/wallet use `"display"`; Task 5 proof card uses `"lg"`). The `get-started` API branch's field names (`name`, `business`, `phone`, `email`, `teamSize`) match exactly between `get-started-form.tsx`'s `FormData` extraction and `route.ts`'s `fields.*` reads.

## Execution

Per the standing instruction at the start of this project ("/subagent-driven-development … you can push straight to main"), this plan executes via **superpowers:subagent-driven-development**: a fresh implementer subagent per task, a task review (spec compliance + code quality) after each, and a broad whole-branch review after Task 10 — all committed directly to `main`.

