# Design system: "Quiet precision"

A single column of type. The neutrals have zero chroma, and one vermilion accent is used sparingly. Hairlines do the work that cards and boxes would otherwise do. All tokens are defined in `app/globals.css`.

## Type
- **Sans:** Hanken Grotesk (`--font-sans`), used for UI and prose.
- **Mono:** Geist Mono (`--font-mono`), used only for metadata, spec labels, and code.
- **Scale (rem):**

  | Size | Use |
  | --- | --- |
  | 0.8125 | `.meta` |
  | 0.9375 | UI |
  | 1.0625 | body and prose |
  | 1.375–1.5 | lede |
  | 1.75 | page h1 |
  | `clamp(2, 4vw, 2.5)` | detail h1 |

- **Tracking** tightens as size grows: -0.03em on detail h1, -0.02em on the lede, 0 on body, +0.01em on mono.
- **Leading:** 1.65 on light backgrounds, 1.7 on dark.

## Color (OKLCH)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | 0.99 | 0.16 | page |
| `--surface` | 0.965 | 0.205 | row hover, code, diagrams |
| `--ink` | 0.2 | 0.94 | titles, primary text |
| `--ink-2` | 0.42 | 0.78 | body copy (8.2 / 9.7:1) |
| `--ink-3` | 0.52 | 0.66 | metadata (≥5:1 on bg and surface) |
| `--rule` / `--rule-strong` | 0.91 / 0.82 | 0.26 / 0.36 | hairlines, link underlines |
| `--accent` | 0.6 0.19 38 | 0.72 0.15 42 | focus ring, link-underline hover, selection |

The accent never colors body text.

**Theme:** on first visit the site follows the OS (`prefers-color-scheme`). After the visitor uses the toggle, `localStorage.theme` wins. The inline script in `app/layout.tsx` sets `data-theme` before first paint.

## Layout
- Measure is `40rem`. The gutter is 1rem on phones and 1.5rem from 640px up.
- Sections are separated by `--section-gap` (`clamp(3.5rem, 8vw, 5rem)`).
- Prose is capped at 65ch.

## Components
- `SectionHeading`: a label, a hairline that fills the row, and an optional link.
- `.plate` (`ProjectPlate`): projects are objects, so each is a raised plate in the chip material at a larger size (`--chip-bg`, a masked gradient border lit from the top, an inner sheen, `--chip-drop`), with a 0.875rem radius.
  - The title comes first, then a two-line description and a mono footer of the first three metadata tags, with an ↗ on the right.
  - On hover the fill lifts and the ↗ nudges 2px up and right. It presses to 0.99.
  - Plates stack with a 0.625rem gap.
- `.ledger-row` (`NoteRow`): notes are writing, so they sit flush on hairlines with no fill.
  - From 640px up there's a 6.5rem mono date column; on phones the date sits above the title.
  - Then the title, a two-line description, and a mono byline (`category · readTime`).
  - On hover the title's underline fades in to `--rule-strong` and the date darkens. There's no arrow.
- `.spec`: a `<dl>` with hairline rows and a mono label column (8rem from 640px up). Used for Stack, project specs, and contact.
- `ExternalLink`: an underlined link with an ↗ that moves 1px on hover.
- `ContactChip` (`.chip`): a raised mono label with a brand icon. Depth comes from a fill a step lighter than the page (`--chip-bg`), a gradient border drawn by a masked `::before` (lit at the top via `--chip-edge-top`, fading to nearly nothing at the bottom), a 1px inner sheen, and a drop shadow (`--chip-drop`) that absorbs the bottom edge. On hover the fill lifts and the ↗ brightens and nudges 1px; it presses to 0.97. Icons are official marks in exact brand colors: Gmail multicolor, LinkedIn #0A66C2, GitHub #181717 (white in dark via `--brand-github`).
- `SkillChip` / `StackList`: the same `.chip` depth, but a static `<span>` with no hover or press (interactive rules are scoped to `a.chip`). Stack is grouped rows: a mono label above each group's chips at every width, so each group fits on one line at the 40rem measure. Data lives in `data/stack.ts`. Brand marks are vendored in `public/icons/stack` (devicon@2.18.0 full-color originals; simple-icons@16.36.0 with its brand hex for Hugging Face, LangChain and LangGraph). Concepts without a brand use neutral lucide glyphs. Marks that vanish on dark get a `darkSrc` variant (AWS).
- `BackLink`: a muted link with a ← and a label.
- `PageIntro`: an h1 plus a one-line intro.
- `CopyButton`: the icon cross-fades with a 2px blur, and an `aria-live` region confirms the copy.

## Background
`Backdrop` is one fixed, static layer behind everything (`z-index: 0`; the page wrapper sits at `z-index: 1`). Content scrolls over it and nothing in it ever animates. No accent appears in it. Layers, back to front:
- **Glow:** a soft radial at top center (`--bd-glow`).
- **Grain:** a tiled SVG noise at 2.5% (light) and 4% (dark) (`--bd-grain`).

Every backdrop token sits below `--rule`, so the backdrop never competes with hairlines that carry meaning. Hidden in print.

**Edge blur** (`EdgeBlur`): a 2.75rem progressive blur fixed to the top edge, so content dissolves as it scrolls off the page. It has six stacked `backdrop-filter` layers (0.5px doubling to 14px), each masked to a band nearer the edge, plus a faint frost of `--bg`. It fades in over the first 4rem of scroll (scroll-driven animation), so the header is never blurred at rest. The fade is on the layers, never the container, because opacity on an ancestor stops `backdrop-filter` from seeing the page. List `-webkit-backdrop-filter` before `backdrop-filter`, or the CSS minifier drops the unprefixed one. Reduced transparency swaps it for a plain `--bg` fade.

## Motion
- **Hover:** color and background transitions only, 150ms. Hover styles apply only on devices with a fine pointer.
- **Press:** `.pressable` scales to 0.97.
- **Page entrance:** one entrance on `main > *`, using opacity and a 4px rise via `@starting-style`, staggered 40ms. Reduced motion drops the rise.
- **Scroll:** wheel and trackpad scrolling is eased by Lenis (`SmoothScroll`, lerp 0.1, wheel ×0.9). Touch stays native. Reduced motion turns it off. Don't add `scroll-behavior: smooth`, because it fights Lenis.
- **Theme switch:** transitions are suppressed for one frame (`data-theme-switching`) so every surface changes color on the same frame.

## Never
- Boxed list items outside `.plate`. Projects are the only raised surface; notes and other lists stay on hairlines.
- Side-stripe borders.
- Uppercase eyebrows.
- Gradient text.
- Numbered section markers.
- `transition: all`.
