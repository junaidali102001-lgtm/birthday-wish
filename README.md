# A Little Birthday Surprise 🎂❤️

A premium, interactive, single-page birthday surprise website. Pure HTML, CSS, and JavaScript — no build tools, no backend, no frameworks.

## How to use

1. Unzip the project.
2. Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Safari, Firefox). No server or internet connection is required for the site to run.
3. To host it for free, upload the whole folder to a **GitHub Pages** repository (or any static host) — it works exactly as-is, with no build step and no modifications needed.

## What's inside

```
birthday-surprise-website/
├── index.html      # All 6 pages/screens (single-page app, smooth transitions)
├── style.css        # All styling: glassmorphism, pastel palette, animations
├── script.js        # All interaction logic: navigation, cake, typing, celebration, dodging button
├── assets/
│   └── favicon.svg  # Site icon
├── music/
│   └── happy-birthday-theme.mp3   # Original instrumental birthday tune
└── README.md
```

## The experience

1. **Welcome** — a waving cat greets the visitor; they type their name to begin.
2. **I Made Something For You** — a cheerful cat with floating hearts.
3. **Funny Cat** — a playful "couldn't find a cake your size" moment.
4. **Birthday Cake** — burning candles the visitor blows out (with smoke + glow), then a knife-cut cake that triggers a full celebration: confetti, balloons, sparkles, fireworks, floating hearts, and music.
5. **Good Wishes** — a heartfelt message typed out on screen.
6. **Final Surprise** — "Did you like my surprise?" The first "No" shows a crying cat; the second time, the "No" button playfully runs from the cursor. "Yes" leads to a joyful cat, thank-you note, and a soft fade-out finale.

## Design notes

- **Palette**: soft pink, lavender, cream, and white with glassmorphism cards (blurred, translucent panels).
- **Typography**: "Fredoka" for playful display headings and "Quicksand" for body text — both fonts are bundled locally in `assets/fonts/` so the design renders correctly with zero internet connection.
- **Characters & cake**: every cat and the birthday cake are built entirely from CSS/HTML shapes and animated with keyframes, instead of downloaded GIF/image files. This keeps the whole project lightweight, crisp at any screen size, free of any licensing concerns, and guarantees nothing ever appears broken or missing — everything renders instantly and identically online or fully offline.
- **Music**: the background track is an original instrumental composition (royalty-free, made for this project) — no third-party audio files.
- **Celebration effects** (confetti, balloons, sparkles, fireworks, hearts) are all generated in vanilla JavaScript/canvas — no external libraries.
- Fully responsive for desktop, tablet, and mobile. Respects `prefers-reduced-motion` for accessibility.

## Customizing

- Edit the message in `script.js` (the `WISH_MESSAGE` variable) to personalize the "Good Wishes" page text.
- Replace `music/happy-birthday-theme.mp3` with any other royalty-free track if you'd like a different tune (keep the same filename, or update the `src` in `index.html`).
- Colors live as CSS variables at the top of `style.css` (`:root { --pink: ...; --lavender: ...; }`) for easy re-theming.
