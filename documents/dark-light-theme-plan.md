# Dark & Light Theme + Vertical Project Journey Plan

## Part 1: Theme System

### Problem
No real theme. `@custom-variant dark` declared but never activated. Hero section has a fake section-only toggle. 30+ hardcoded colors everywhere.

### Approach
Install `next-themes`, restructure `tailwind.css` with light/dark CSS variable palettes, wrap in `<ThemeProvider>`, add navbar toggle, fix all hardcoded colors.

### Steps

**1. Install `next-themes`**
`npm install next-themes`

**2. Restructure `pages/tailwind.css`**
- Light palette (`:root`): white bg, dark text, teal accent, black borders
- Dark palette (`.dark`): existing dark values preserved
- `@theme` block references `var(--c-*)` instead of hardcoded hex
- Replace `html,body` hardcoded bg/color with `bg-background text-foreground`
- Replace scrollbar hardcoded colors with CSS vars
- Remove `.hero-inverted` block

**3. Add `color-scheme` meta tag in `pages/+Head.tsx`**

**4. Wrap app in ThemeProvider + add navbar toggle in `pages/+Layout.tsx`**
- `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>`
- Add `suppressHydrationWarning` to `<html>`
- Theme toggle button in navbar (sun/moon icons using FontAwesome)
- `attribute="class"` toggles `.dark` on `<html>` — matches existing `@custom-variant dark (&:is(.dark *))`

**5. Fix hardcoded colors across all pages**

| File | Issue | Fix |
|------|-------|-----|
| `pages/index/+Page.tsx` | Hero pseudo-toggle, `bg-white/[0.03]`, `text-white`, hardcoded gradient | Remove toggle, `bg-foreground/[...]`, `text-foreground` |
| `pages/work/+Page.tsx` | `bg-white text-background` on filter, `bg-white/[0.04]`, `hover:text-white`, hardcoded card gradient | `bg-foreground text-background`, `bg-foreground/[0.04]`, `from-card to-background` |
| `pages/contact/+Page.tsx` | `bg-white/[0.03]`, `text-white`, `placeholder-text-muted`, `bg-white text-background`, `hover:text-white` | `bg-foreground/[0.03]`, `text-foreground`, `placeholder:text-text-secondary/40`, `bg-foreground text-background` |
| `pages/about-me/+Page.tsx` | `text-white/30`, `bg-white/[0.02]`, hardcoded avatar glow | `text-foreground/20`, `bg-foreground/[0.02]`, use CSS var for glow |
| `pages/services/+Page.tsx` | `hover:bg-white/[0.01]` | `hover:bg-foreground/[0.02]` |

**6. Fix `components/CustomCursor.tsx`**
- Read `--c-accent`, `--c-foreground`, `--c-background` CSS vars on mount and theme change
- Replace all 6 hardcoded hex/rgba values with computed state

---

## Part 2: Vertical Project Journey (Home Page)

### Concept
A new section on the home page where project cards are arranged vertically. As the user scrolls down, cards animate into view, creating a "vertical journey" through projects. Similar to Apple-style product scroll reveals.

### Design
- Vertical stack of full-width cards, each ~80vh tall
- Staggered content layout (image left / text right, alternating)
- Each card has a project image/thumbnail, title, category, description, and year
- Cards animate in with scale/opacity as they enter the viewport (use framer-motion `whileInView`)
- Smooth parallax or scale effect tied to scroll position
- Section title: "The Journey" / "Project Journey"
- Uses project data from the existing work page

### Steps

**1. Create `components/ProjectJourney.tsx`**
- Accept project data array as prop
- Each card: full viewport height, split into two halves (image + text)
- Alternating layout every other card
- `whileInView` animation: fade up + scale from 0.95 to 1
- Parallax: image slightly moves opposite to scroll direction (use `useScroll` + `useTransform` or CSS `background-attachment`)
- Sticky-like feel: use `motion.div` with `viewport={{ once: true, margin: "-20%" }}`

**2. Add to `pages/index/+Page.tsx`**
- Add project data (reuse/modify from work page)
- Insert `<ProjectJourney>` section after the existing showreel section
- Use the same CSS variable tokens for theme compatibility

---

## Verification
1. `npm run dev` — app loads without errors
2. Theme toggle in navbar — switches entire site light/dark
3. All pages render correctly in both modes
4. Custom cursor adapts colors
5. Scrollbar adapts colors
6. Hero section no longer has its own toggle
7. System preference respected on first load
8. Vertical project journey scrolls smoothly, cards animate in, both themes look correct
