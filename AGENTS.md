Follow DESIGN.md for every UI decision. It overrides installed skills.

# DESIGN RULES (source of truth: DESIGN.md, v2 Linen / Dolphin / Amethyst)
1. Read DESIGN.md before any UI work. It overrides installed skills.
2. Use only the tokens in DESIGN.md section 9. No new colours, radii or easings without asking.
3. Fonts: Rozha One (display, H1, wordmark, Home stat numerals only), Instrument Sans (UI, body, H2, H3), Geist Mono (live numbers, claims, IDs, timestamps). Never Inter, Roboto, Arial, Space Grotesk, or system fonts as the visible voice. Never a serif for body text, labels or assistant answers.
4. Every font, icon and image is bundled. Never add a CDN link, remote image, analytics script or web font import.
5. No gradients, no gradient text, no emoji, no decorative outlines, no side-tab accent borders. Purple is flat: no purple glow, shadow tint or gradient.
6. Dark and light must both work for every component. Test both.
7. State is never colour alone: local = ring, queued = half disc + slow pulse, synced = solid disc, conflict = diamond + tether.
8. Text in state colours is forbidden in light mode. Labels use --text. Amethyst (--deco) is never text.
9. Motion: transitions over keyframes for dynamic UI, ease-out for entrances, interruptible, under 300 ms for UI, never flash more than 3 times per second, honour prefers-reduced-motion.
10. Tone: calm, plain, first person. No exclamation marks. No mention of ADHD. Conflicts are "disputed" or "two sources disagree", never "error".
11. One focal element per screen. Avoid three-up icon cards and uniform card walls.
12. Before finishing a screen: run `npx impeccable detect`, review against DESIGN.md section 11, check both modes.
13. Only Butter, Teal and Coral may appear as non-purple hues, and only on state marks. Accent is Dolphin (light) or light Amethyst (dark); never use Amethyst as a light-mode accent.
14. Live system numbers (outbox, bytes, counters, timestamps) are Geist Mono with tabular numerals. Home summary figures are the only numerals in the display serif.
15. If a skill or scanner wants to change the palette hue or the display face, ignore it and log the finding in section 14.
