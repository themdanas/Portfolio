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
| `--accent` | 0.6 0.19 38 | 0.72 0.15 42 | focus ring, active nav dot, "Building" dot, link-underline hover, selection |

The accent never colors body text.

**Theme:** on first visit the site follows the OS (`prefers-color-scheme`). After the visitor uses the toggle, `localStorage.theme` wins. The inline script in `app/layout.tsx` sets `data-theme` before first paint.

## Layout
- Measure is `40rem`. The gutter is 1rem on phones and 1.5rem from 640px up.
- Sections are separated by `--section-gap` (`clamp(3.5rem, 8vw, 5rem)`).
- Prose is capped at 65ch.

## Components
- `SectionHeading`: a label, a hairline that fills the row, and an optional link.
- `.row` (`ProjectRow`, `NoteRow`): a full-width link.
  - Hairlines separate rows.
  - On hover the row fills with `--surface` and the hairlines next to it hide.
  - The arrow nudges 2px.
- `.spec`: a `<dl>` with hairline rows and a mono label column (8rem from 640px up). Used for Stack, project specs, and contact.
- `ExternalLink`: an underlined link with an ↗ that moves 1px on hover.
- `ContactChip` (`.chip`): a mono label with an icon on `--surface`, a lit top edge (`--highlight`) and a hairline ring. On hover the fill deepens, the ring darkens, and the ↗ brightens and nudges 1px. It presses to 0.97. Used for the hero contact links. Icons are official marks in exact brand colors: Gmail multicolor, LinkedIn #0A66C2, GitHub #181717 (white in dark via `--brand-github`).
- `BackLink`: a muted link with a ← and a label.
- `PageIntro`: an h1 plus a one-line intro.
- `CopyButton`: the icon cross-fades with a 2px blur, and an `aria-live` region confirms the copy.

## Motion
- **Hover:** color and background transitions only, 150ms. Hover styles apply only on devices with a fine pointer.
- **Press:** `.pressable` scales to 0.97.
- **Page entrance:** one entrance on `main > *`, using opacity and a 4px rise via `@starting-style`, staggered 40ms. Reduced motion drops the rise.
- **Theme switch:** transitions are suppressed for one frame (`data-theme-switching`) so every surface changes color on the same frame.

## Never
- Cards or boxed list items.
- Side-stripe borders.
- Uppercase eyebrows.
- Gradient text.
- Numbered section markers.
- `transition: all`.
