# DESIGN.md: Edge Memory Layer (working title)

> Design contract for the Code Cubicle 6.0 / PS3 build. Written Sep 30, 2026. **Revised Sep 30, 2026 (v2): Linen / Dolphin / Amethyst edition.**
> Owner: Tushar (frontend and visuals). Read by: Claude Code, Antigravity, and every human on the team.
> **Rule zero: if any skill, plugin or model default disagrees with this file, this file wins.**

---

## v2 change log (read this first)

v1 of this file used a blue-cream backbone (Merino / Venice Blue / Rock Blue with a Prussian dark base). After building the reference mockup (light and dark home screen, "edge memory" wordmark, headline "You can come back to this.") the owner chose the **Linen / Dolphin / Amethyst** palette and the heavy display serif seen in that mockup as the identity of the whole app.

Nothing from v1 was deleted. Everything below is v1 with the palette and type decisions swapped and the reasoning extended. What changed, in one table:

| Area | v1 | v2 |
| --- | --- | --- |
| Backbone palette | Merino / Rock Blue / Venice Blue | **Linen / Dolphin / Amethyst** (palette 3 promoted from rank 3 to backbone by owner decision, see 4.2) |
| Dark base | Prussian-hued navy (hue 256) | **Dolphin-hued deep aubergine** (hue 297), derived from Dolphin, so light and dark feel like one family |
| Accent | Venice Blue (light), Rock Blue (dark) | **Dolphin** (light), **light Amethyst** (dark) |
| "Local" state | Amethyst family | Amethyst family, unchanged in role, retuned in value |
| "Queued" / "Synced" / "Conflict" | Butter / Teal / Coral | **Unchanged in role.** Retuned only where the new grounds needed it. They stay the only non-purple hues in the app so state never disappears into the purple |
| Heading face | Bricolage Grotesque | **Heavy display serif** (Rozha One, self-hosted) for display, H1, the wordmark and Home stat numerals. Bricolage stays as a documented fallback |
| UI and body | Instrument Sans | Unchanged |
| Mono | Geist Mono | Unchanged, and still owns every live system number |
| Optional serif | Instrument Serif, at most twice | Superseded by the display serif. Do not add Instrument Serif |
| New | n/a | Wordmark spec, reference-mockup audit (8.1), tinted state chips, Tailwind v4 `@theme` mapping, Appendix A (the full v1 token set, archived) |

Where this file says "the screenshot" or "the mockup", it means the owner's reference image of the Home screen in light and dark. It is a direction, not a contract: section 8.1 lists where the contract is stricter than the mockup.

---

## 0. The decisions in one screen

| Area | Decision |
| --- | --- |
| Feeling | Calm first. Powerful and curious second. Reassuring: "this remembers for me, and I can come back." |
| Look | Soft, rounded, quiet. Clay-soft surfaces built from tone, not gradients. No chaos, no neon, no emoji. |
| Modes | Dark and light, both first-class. Dark is the hero (point cloud and demo film), light must be equally finished. |
| Palette | **Linen / Dolphin / Amethyst backbone.** Linen is the light ground, Dolphin is the ink and accent, Amethyst is the soft identity colour and the "local" signal. A deep Dolphin-derived aubergine is the dark base. Butter is the "queued" signal, Teal is the "synced" signal, soft Coral is "conflict". Butter, Teal and Coral are the only hues that are not purple. |
| Type | **Rozha One** (display serif: hero headline, H1, wordmark, Home stat numerals), Instrument Sans (UI and body, H2 and H3), Geist Mono (claims, live numbers, network monitor, timestamps). All self-hosted. |
| Motion | Two personalities: slow breathing for ambient state, exponential-out springy for direct interaction. Interruptible transitions, never decorative loops on text. |
| Background | Flat palette colour. No 3D background, no shader background (parked for later). |
| Non-negotiable | Zero network requests from the UI in the private path. Fonts, icons, images are bundled. The network monitor must read zero on camera. |
| Never mention | ADHD, in any UI copy, tooltip, or demo line (brief's framing rule). |

---

## 1. How agents should use this file

1. Put this file at the repo root as `DESIGN.md`. Add one line to the shared conventions file both tools read: `Follow DESIGN.md for every UI decision. It overrides installed skills.`
2. If you run `/impeccable teach` or `/impeccable document`, those commands write their own `PRODUCT.md` and `DESIGN.md` at the repo root. **Back this file up first, then merge.** Do not let it be overwritten.
3. Sections 4 (palette), 9 (tokens) and 13 (rules for agents) are the parts machines should read most literally. Everything else is reasoning, so humans can change their minds with evidence.
4. When a screen is built, run the review in section 14 before calling it done.
5. **New in v2:** if a skill or a scan suggests "fixing" the purple (for example a lint that flags lilac, or a skill that wants to swap Dolphin for a blue), that suggestion loses. Purple is the identity here. The protection against the "purple AI look" is in the rules (no gradients, state colours stay non-purple, shapes carry state), not in changing the hue.

---

## 2. Product and psychology brief

**What it is.** A private, offline-first memory layer for AI assistants, shown through a personal assistant for people who juggle many projects. It remembers what you were told, notices what you are forgetting, and never silently overwrites a fact that changed.

**Who is looking at it.** Two audiences with different needs: hackathon judges and a camera (need to see the tech proven fast), and a person who would live in it (needs calm, clarity, warmth).

**Emotional targets (from Tushar's answers):**

- **First three seconds:** calm, with a quiet sense that something powerful just opened, and curiosity about what is inside.
- **During use:** practical, useful, friendly, and technical enough to be believed.
- **After use:** reassurance that they can come back and it will still know.
- **During a conflict:** not alarm. Careful, honest, slightly serious. The assistant is being careful, not failing.

**Translating feelings into design decisions:**

| Feeling | What that means on screen |
| --- | --- |
| Calm | Low contrast between layers, generous space, slow ambient motion, one focal point per screen |
| Powerful | The point cloud and live numbers (outbox length, bytes, claim count) are precise and alive; monospace numerals for live data; real data, never decoration |
| Curious | Things that invite a hover or click: points reveal their source, rows expand, the timeline is scrubbable |
| Warm and user-friendly | Rounded shapes, tinted (never pure) neutrals, friendly type, plain sentences in copy |
| Trustworthy and technical | Sources are always shown, states are always labelled, nothing is hidden. Precision in details |
| Worth returning to | A quiet "home" state that shows what is remembered and what needs attention, not a dashboard of alarms |

**Honest tension to manage:** "cute and soft" plus "technical and powerful" can collide. The resolution is: cute lives in shape, tone and motion (radii, tinted surfaces, springy press feedback). Technical lives in content (mono numerals, sources, states). Never put cute in the copy (no mascots, no emoji, no baby-talk), and never put cold in the shape.

**A second tension, new in v2:** a lilac-and-linen palette is already soft, so the risk flips. The danger is no longer "too cold", it is "too sweet and too uniform". The counterweights are: a heavy serif with real authority in the headline, precise mono numerals, deep Dolphin ink instead of pastel text, and state colours that are visibly not purple. If a screen reads as a stationery brand, add precision. If it reads as a terminal, add softness.

---

## 3. Inspiration, read carefully

Tushar's references, what to take, what to leave. (Claude, osu!, ixigo and GuitarTuna were described by Tushar; they should be re-checked against screenshots before the team leans on the detail.)

| Reference | Take | Leave |
| --- | --- | --- |
| **Claude's interface** | Quiet hierarchy, lots of space, text-first calm, a single warm neutral doing the heavy lifting | The exact cream and terracotta look. Research shows "cream + terracotta" and monochrome chrome are now recognised as "tasteful AI defaults". Borrow the mood, not the palette or type. Note for v2: our Linen ground is warm like Claude's cream, so the separation now comes from the Dolphin and Amethyst ink, the display serif, and the state language. Never add terracotta or brown |
| **ixigo (claymorphism)** | Soft, tactile, rounded surfaces; friendly depth; big tappable shapes | Heavy gradients and glossy inflation. We build clay from tonal steps plus layered soft shadows |
| **GuitarTuna** | One clear job per screen, a single live indicator that tells you instantly how you are doing, minimal chrome | Anything toy-like in the copy |
| **osu!** | Confidence, rounded panels, responsive springy feedback, a UI that feels alive when you touch it, cool without being loud | The game's intensity and sound design |
| **Persona / Elden Ring** | Only the ideology: commitment to a single strong visual idea and a coherent world | Chaos, high-contrast drama, ornament. Explicitly excluded for this project |
| **The v1 mockup (light and dark home)** | The wordmark lockup, the "You can come back to this." headline in a heavy display serif, the four-figure summary row, the recent-activity list, the point cloud with hub nodes and tethers, the status bar reading "Working offline" with 0 B/s in and out | Any element that breaks the contract: see 8.1 |

**The one strong idea for this product:** *a calm surface over a living memory.* The interface is quiet; the point cloud and the numbers are where the life is. Every design decision should serve that contrast.

---

## 4. Colour

### 4.1 Your five palettes, measured

Measured in OKLCH (perceptual lightness L, chroma C, hue H) and WCAG contrast. This table is unchanged from v1 and stays as the source record: the palette **Linen / Dolphin / Amethyst** is now the backbone, and the others are kept as reference and as donors of a single colour where noted.

| Colour | Hex | L | C | H | Notes |
| --- | --- | --- | --- | --- | --- |
| Whipped Butter | `#F2E6B3` | 0.922 | 0.067 | 96 | Warm yellow-cream |
| Cookie Crumble | `#4B2E21` | 0.333 | 0.048 | 45 | Warm dark brown |
| Merino | `#F5EEDD` | 0.950 | 0.024 | 88 | Soft warm paper |
| Rock Blue | `#84B3CE` | 0.743 | 0.063 | 234 | Dusty light blue |
| Venice Blue | `#16587B` | 0.438 | 0.086 | 237 | Deep calm blue |
| **Linen** | `#FDF1E2` | 0.964 | 0.024 | 74 | Peachy paper. **Backbone: light ground and dark-mode text** |
| **Dolphin** | `#655A7C` | 0.491 | 0.055 | 299 | Muted grey-violet. **Backbone: ink, accent, and the hue the dark base is built from** |
| **Amethyst** | `#AB92BF` | 0.698 | 0.070 | 310 | Soft lilac. **Backbone: identity colour, decoration, and the "local" signal** |
| Teal | `#008080` | 0.543 | 0.093 | 195 | The CSS named colour `teal`. Donor of the "synced" hue |
| Beige | `#F5F5DC` | 0.964 | 0.033 | 107 | The CSS named colour `beige` |
| Prussian Blue | `#1F4072` | 0.374 | 0.094 | 259 | Deep saturated navy |
| Butter Yellow | `#FFF3B4` | 0.959 | 0.081 | 99 | Pale butter. Donor of the "queued" hue |

Contrast inside the palettes as given:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Cookie Crumble on Whipped Butter | 9.78 | Excellent |
| Prussian Blue on Butter Yellow | 9.21 | Excellent |
| Venice Blue on Merino | 6.68 | Good for text |
| Dolphin on Linen | 5.70 | Good for text |
| Teal on Beige | 4.31 | Large text only |
| Teal on Butter Yellow | 4.26 | Large text only |
| Rock Blue on Venice Blue | 3.43 | Graphics and large text only |
| Amethyst on Linen | 2.48 | Decoration only. Never text |
| Amethyst on Dolphin | 2.30 | Decoration only. Never text |
| Rock Blue on Merino | 1.95 | Decoration only. Never text |

**The chosen backbone, measured for v2 (all computed):**

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Dolphin on Linen | 5.70 | Body text and accent. Good |
| Linen on Dolphin | 5.70 | Text on a Dolphin button. Good |
| Deep ink `#2B2140` on Linen | 13.52 | Primary text. Excellent |
| Deep ink `#2B2140` on Amethyst | 5.45 | Text on an Amethyst avatar or chip. Good |
| Deep heading `#4B3A66` on Linen | 9.00 | Display headline in light mode. Excellent |
| Amethyst on Linen | 2.48 | Decoration only. Never text |
| Linen on Amethyst | 2.48 | Never put linen text on Amethyst |
| Amethyst on Dolphin | 2.30 | Decoration only. Never text |

Two consequences the mockup should not hide: (1) the pale lilac subline under the headline in the light mockup is a lighter tint than any token here and reads around 3.5:1, so body-size copy uses `--text-muted` (Dolphin, 5.70) instead; (2) initials on the Amethyst avatar use the deep ink, not linen.

### 4.2 Ranking: how well each palette serves *this* app

Scores (1 to 5) are my judgement against this brief, using the measurements above. Criteria: calm, warmth and softness, technical credibility, dark-mode potential, ability to carry the four memory states, distance from AI-default looks.

| Rank | Palette | Calm | Soft and warm | Technical | Dark mode | State support | Not generic | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Merino / Rock Blue / Venice Blue** | 5 | 4 | 4 | 4 | 3 | 4 | **The backbone.** Calm, friendly, credible. Gives light-mode surfaces, the interactive accent, and the ink colour. Rock Blue is decorative only (1.95 on Merino) |
| 2 | **Prussian Blue / Butter Yellow** | 4 | 4 | 5 | 5 | 5 | 4 | **The dark base and the "queued" signal.** Prussian deepens into an excellent dark surface; butter yellow is the natural "waiting offline" colour |
| 3 | **Linen / Dolphin / Amethyst** | 4 | 5 | 3 | 3 | 4 | 4 | **The cute softness.** Amethyst becomes the "local only" colour; Linen is a warm tint for assistant surfaces. Dolphin is too mid-tone to be a dark base |
| 4 | **Teal / Beige** | 3 | 3 | 3 | 2 | 4 | 2 | **Borrow one colour.** Both are literally CSS named defaults, which reads dated and unconsidered. Keep teal as the "synced" signal (retuned), drop beige |
| 5 | **Whipped Butter / Cookie Crumble** | 4 | 5 | 2 | 4 | 2 | 2 | **Hold back.** Beautiful contrast (9.78), but brown on butter sits closest to the "warm cream and brown" look models now default to, and it cannot carry technical state colours. A good candidate for a pitch-deck or film title palette instead, kept separate from the app |

**Decision update (v2): the owner overrode the ranking and chose palette 3 as the backbone.** The ranking table above is kept as the honest record of the trade-offs, because palette 3 scored lowest of the top three on exactly the two things this app leans on: technical credibility (3) and dark mode (3). The v2 tokens exist to close those two gaps:

| Weakness in the ranking | How v2 answers it |
| --- | --- |
| "Dolphin is too mid-tone to be a dark base" (dark mode 3) | Dolphin is not used as the dark surface. The dark base is a **deeper aubergine of the same hue (297)** at L 0.25 to 0.34, so dark mode is still Dolphin's family without inheriting its mid-tone problem. Text in dark mode is Linen (14.43 on the base) |
| Technical credibility 3 | Lilac is never asked to carry precision. Precision comes from Geist Mono numerals, deep Dolphin ink (not pastel), always-visible sources, and state shapes. The display serif adds authority to the one headline per screen |
| State support 4, with local and accent both purple | State colours other than local are deliberately non-purple. Local differs from the accent by lightness and by shape (ring), and is never used on a button |
| Amethyst and Linen fail contrast (2.48) | Amethyst is decoration only on light grounds. The light-mode "local" mark is a deeper Amethyst (`#74529A`) that passes 5.5 |

### 4.3 The combination

**v2 structure.** Structure and identity from palette 3 (Linen ground, Dolphin ink and accent, Amethyst softness), a dark base derived from Dolphin's hue, and the semantic state hues carried over from v1: amber from palette 2 (queued), teal from palette 4 (synced), and one addition (conflict). The v1 blue structure is archived in Appendix A.

- **Coral (conflict) is new.** None of the five palettes has a red-family hue, and the brief needs one ("conflicting pairs flash red"). It is kept soft and muted to stay inside the calm brief, and it is used *only* for conflict. The mockup already shows it as a small coral diamond on the "open conflicts" tile, which is exactly the right scale.
- **Dolphin is the accent, Amethyst is not.** Amethyst cannot be a light-mode accent (2.48 on Linen). Dolphin can (5.70). In dark mode the accent is a lighter Amethyst (`#C9B4DC`, 8.45).
- **The dark base is derived, not borrowed.** Hue 297, chroma 0.038 to 0.057, so the dark surfaces share Dolphin's hue and feel like the same product at night.
- **Butter, Teal and Coral stay non-purple on purpose.** In an all-lilac interface the state signal would vanish. They are the only saturated non-purple hues and appear only on state marks.

**Usage ratio (60 / 30 / 10):** 60% background and surfaces, 30% text and structure, 10% accent and state colour. If the screen looks colourful, too much state colour is on it. In v2 add: if the screen looks *purple*, too much Amethyst decoration is on it. Amethyst decoration (icons tiles, cloud points, avatar) shares the 10% with state colour.

### 4.4 Final tokens

All contrast ratios below were computed, not estimated.

**Dark mode (hero)**

| Token | Hex | Role | Contrast vs `bg` |
| --- | --- | --- | --- |
| `--bg` | `#241E32` | Page (Dolphin-hued aubergine) | n/a |
| `--surface` | `#2F2840` | Panels and cards | n/a |
| `--raised` | `#3A3250` | Popovers, hovered rows | n/a |
| `--line` | `#4A4163` | Hairlines | 1.7 (separator, not text) |
| `--text` | `#FDF1E2` | Primary text (Linen, never pure white) | 14.4 |
| `--text-muted` | `#B7ADC9` | Secondary text | 7.5 |
| `--accent` | `#C9B4DC` | Buttons, links, focus (light Amethyst family) | 8.5 |
| `--state-local` | `#AB92BF` | Device-only (Amethyst) | 5.8 |
| `--state-queued` | `#F1DF88` | Waiting to sync (Butter family) | 12.0 |
| `--state-synced` | `#77E0D3` | Synced (Teal family) | 10.2 |
| `--state-conflict` | `#F68482` | Disputed (soft coral) | 6.5 |

Dark-mode note on the mockup: the mockup's dark grounds sit about one step lighter (mid aubergine). This file goes deeper so the point cloud and the demo film keep their hero contrast. If the team prefers the mockup's exact depth, shift `--bg`, `--surface`, `--raised` up one step each (`#2F2840`, `#3A3250`, `#453C5E`) and re-run the checks in 4.5. This is listed as an open decision in section 15.

**Light mode**

| Token | Hex | Role | Contrast vs `bg` |
| --- | --- | --- | --- |
| `--bg` | `#FDF1E2` | Page (Linen) | n/a |
| `--surface` | `#FFF8EE` | Panels and cards | n/a |
| `--raised` | `#FFFCF6` | Popovers, hovered rows | n/a |
| `--tint` | `#F5E6EE` | Assistant surfaces, soft highlights, icon tiles (soft lilac-rose) | n/a |
| `--line` | `#E7D9CB` | Hairlines | 1.2 (separator, not text) |
| `--text` | `#2B2140` | Primary text (deep Dolphin-hued ink, not black) | 13.5 |
| `--heading` | `#4B3A66` | Display serif headline only | 9.0 |
| `--text-muted` | `#655A7C` | Secondary text (Dolphin) | 5.7 |
| `--accent` | `#655A7C` | Buttons, links, focus (Dolphin) | 5.7 |
| `--accent-hover` | `#574B6D` | Pressed and hovered accent | 7.2 |
| `--on-accent` | `#FDF1E2` | Text on an accent button | 5.7 |
| `--state-local` | `#74529A` | Device-only (deepened Amethyst) | 5.5 |
| `--state-queued` | `#A87A14` | Waiting to sync | 3.5 |
| `--state-synced` | `#1C8580` | Synced | 4.0 |
| `--state-conflict` | `#C13C3B` | Disputed | 4.7 |
| `--deco` | `#AB92BF` | Amethyst, decoration only (cloud points, avatar fill, icon strokes on tint) | 2.5, never text |

In dark mode `--heading` equals `--text`, `--on-accent` is `#241E32` (8.5 on the accent), `--accent-hover` is `#D9C9E8`, and `--deco` is `#AB92BF`.

**Colour rules that follow from the numbers:**

- In light mode, `queued` (3.5) and `synced` (4.0) pass for graphic marks (3:1) but **not for text**. `conflict` (4.7) technically clears 4.5 but is still not used for text, so the rule stays simple. Labels next to a state mark are always set in `--text`, never in the state colour.
- Rock Blue, Amethyst on light surfaces, and any pastel at L above 0.65 on a light ground are decoration only. In v2 this is the rule that protects the mockup's pale lilac from becoming body copy.
- Never use pure `#000` or `#FFF`.
- Never put a gradient on text, a button, or a background. Depth comes from the surface steps above.
- Dolphin is text and accent. Amethyst is decoration and the local mark. Never swap them.

### 4.5 Colour-blind check (the four states must survive)

Amber, green and red is the classic failure trio. I simulated protanopia, deuteranopia and tritanopia and measured the OKLab distance (scaled by 100) between every pair of state colours (minimum across normal vision and the three simulations). Higher is safer.

| Pair | Dark mode | Light mode |
| --- | --- | --- |
| Local vs queued | 21.5 | 13.6 |
| Local vs synced | 14.4 | 8.8 |
| Local vs conflict | 9.1 | 15.3 |
| Queued vs synced | 10.6 | 12.3 |
| Queued vs conflict | 16.3 | 6.7 |
| Synced vs conflict | 12.7 | 11.5 |

The worst case per mode after tuning:

| Mode | Worst pair and condition | Distance | Reading |
| --- | --- | --- | --- |
| Dark | local vs conflict (protanopia) | 9.1 | Comfortable |
| Light | queued vs conflict (deuteranopia) | 6.7 | Borderline, so shape must back it up |

I first tried a lighter local colour in light mode (`#8B6BA8`) and found local and synced dropped to 5.9 under deuteranopia, so local is deeper (`#74529A`) and now differs from synced in *lightness* as well as hue. In dark mode local is the plain Amethyst and is already well separated. Because the app is now largely purple, local and the accent sit close in hue: they are told apart by lightness, by never sharing a component (accent lives on buttons, links and focus; local lives on state marks), and by the ring shape.

**Therefore colour is never the only carrier of state.** Every state also has a shape and a motion:

| State | Colour | Shape (point cloud and inspector) | Motion |
| --- | --- | --- | --- |
| Local (device only) | Lilac | Hollow ring | Still |
| Queued (waiting to sync) | Butter | Half-filled disc | Slow breathing pulse (4 to 6 s) |
| Synced | Teal | Solid disc | One soft ripple on arrival, then still |
| Conflict | Coral | Diamond, paired with a thin tether line | Two gentle pulses, then pull together, then hold |

### 4.6 Where each colour lives (v2 map)

| Colour | Lives on | Never on |
| --- | --- | --- |
| Linen | Light page ground; all text in dark mode | Text in light mode (no linen-on-Amethyst) |
| Dolphin | Light-mode ink for muted text, buttons, links, focus rings; the hue of the dark base | Cloud points (too dark to read as soft) |
| Deep ink `#2B2140` | Primary text, avatar initials on Amethyst | Large decorative fills |
| Amethyst (`--deco`) | Cloud points at rest, avatar fill, icon tile strokes, empty-state art | Text, focus rings, primary buttons |
| Amethyst deep / light (`--state-local`) | The "local" ring and its chip | Buttons |
| Butter (`--state-queued`) | Queued mark, "Working offline" status mark | Backgrounds, text |
| Teal (`--state-synced`) | Synced mark and arrival ripple | Backgrounds, text |
| Coral (`--state-conflict`) | Conflict diamond and tether, the conflict count mark | Banners, full-width fills, text |

**Tinted state chips (enhancement).** A chip's fill is its state colour mixed into the surface at low strength, not a gradient: `color-mix(in oklch, var(--state-queued) 16%, var(--surface))`. The chip label is `--text`, the mark carries the state shape. This keeps chips calm in both modes and keeps light-mode text contrast intact.

---

## 5. Typography

### 5.1 What the research says

- The "AI default" is Inter, Roboto, Arial and system fonts. Anthropic's own design guidance tells Claude to avoid them. Community rules also flag Space Grotesk as a font models converge on.
- Free, non-default UI faces with good reviews in 2026: Geist (technical), Instrument Sans (a slight humanist warmth that reads pleasantly in long text), Figtree (curvy, friendly), Hanken Grotesk, Plus Jakarta Sans, DM Sans, Satoshi (Fontshare, friendlier and rounder), and Bricolage Grotesque (one variable family with real character that covers headlines and body).
- Reviews note Outfit sits in a crowded "friendly geometric" space. DM Sans has low contrast and can feel slightly heavy in dense paragraphs.
- Variable fonts are now the default recommendation.
- **Added in v2:** the mockup's identity is a heavy, high-contrast display serif set very large and tight. That is a headline voice, not a reading voice. The rule that keeps it safe: it appears only where there is one line of big type (hero headline, H1, wordmark, summary numerals), never in running text, never in labels, never in the assistant's answers.

### 5.2 Decision

| Role | Font | Why |
| --- | --- | --- |
| Display, H1, wordmark "edge", Home summary numerals | **Rozha One** (single weight 400, self-hosted WOFF2) | Heavy, high-contrast, flared display serif. It is the closest free, openly licensed face to the one in the mockup and palette card, and it gives the calm surface one voice with authority. Set it large, tight (`-0.01em`) and only where there is one line of type. Do not synthesise bold or italic |
| H2, H3, card titles, panel titles | **Instrument Sans** 600 | Heavy serif at 20 to 26 px turns clumsy and competes with the headline. Sans titles keep the panels quiet, as in the mockup's "Recent activity" |
| UI and body | **Instrument Sans** (variable) | Humanist warmth at 14 to 16 px, calm rhythm, not a default |
| Claims, IDs, live numbers, network monitor, timestamps | **Geist Mono** (variable) | The "technical" voice. Tabular numerals keep counters from jittering |
| Wordmark second half "memory" | Instrument Sans 400, `--text-muted` | The mockup pairs a bold serif "edge" with a light sans "memory". Keep that pairing |

**About the display face.** The exact typeface in the screenshot cannot be identified reliably from a flattened image, so Rozha One is the chosen match. Day-1 test: set the headline "You can come back to this." in Rozha One and in the alternates below, in both modes, and pick the one that looks closest to the mockup. If the owner knows the real name of the mockup face and its licence allows embedding, swap it in by changing one token (`--font-display`) and one `@font-face`; nothing else in this file changes.

| Display candidates to compare on day 1 | Note |
| --- | --- |
| Rozha One (default) | Heaviest and most flared |
| Chonburi | Slightly wider, slightly softer |
| Gloock | Calmer contrast, a touch less heavy |
| DM Serif Display | Safest and most readable, least distinctive |

**Fallback stack B (if the display serif fights the clay shapes):** Bricolage Grotesque for display and H1 (as in v1), or Satoshi (headings and UI, self-hosted from Fontshare, free for commercial use) plus Geist Mono. Bricolage remains in `tokens.css` as a commented `@font-face` so the swap is one line.

**Fonts I deliberately rejected:** Inter, Roboto, Arial, system fonts (AI default); Space Grotesk (converged); Nunito and Quicksand (read as toy-like, break the "technical" half of the brief); Fraunces (excellent, but the most common "warm serif" choice and it pulls toward the Claude look). Also rejected in v2: **Instrument Serif** (its light, elegant contrast does not match the mockup's heavy face and would create two competing serifs) and any serif for body or assistant answers.

**Serif boundary, stated once more because it is the easiest rule to break:** the display serif is a headline. The assistant's answers stay in Instrument Sans at `--t-body-lg`. Setting answers in a serif is Claude's look and would make us read as a copy.

### 5.3 Critical for this project: self-host everything

This app must show **zero network traffic** during private operations and work with no signal. A Google Fonts `<link>` or CDN import is a network request on every launch and will break both the offline claim and the network-monitor shot. Bundle WOFF2 files inside the Tauri app. Same rule for icons and images. Download Rozha One from its open-font release once, subset it to the Latin range, convert to WOFF2, and commit it under `/fonts`.

### 5.4 Scale

| Token | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| `--t-display` | 48 / 52 | 400 (Rozha One) | One hero moment per screen at most: the Home headline |
| `--t-h1` | 34 / 40 | 400 (Rozha One) | Screen titles |
| `--t-stat` | 34 / 36 | 400 (Rozha One) | The four summary numerals on Home only |
| `--t-h2` | 26 / 32 | 600 (Instrument Sans) | Panel titles |
| `--t-h3` | 20 / 28 | 600 (Instrument Sans) | Card titles |
| `--t-body-lg` | 17 / 26 | 400 (Instrument) | Assistant answers |
| `--t-body` | 15 / 24 | 400 | Default UI |
| `--t-small` | 13 / 20 | 400 to 500 | Metadata, table cells |
| `--t-micro` | 12 / 16 | 500 | Labels, state chips |
| `--t-mono` | 13 / 20 | 400 (Geist Mono) | Claim values, IDs, counters, timestamps (`font-variant-numeric: tabular-nums`) |

Rules: display and H1 tracked slightly tight (`-0.01em`), micro labels tracked slightly open (`+0.02em`). No ALL CAPS paragraphs. Max line length 68 characters for answers. Display type uses `font-synthesis: none` and `text-wrap: balance` so the headline breaks into even lines like the mockup's two-line "You can come / back to this."

**Which numerals use which face (resolves a v1 rule against the mockup).** v1 said the numbers that matter get the largest mono size. The mockup sets the four Home summary figures in the display serif. Both are kept, split by meaning:

| Numeral | Face | Reason |
| --- | --- | --- |
| Home summary figures (claims remembered, active projects, open conflicts, devices synced) | Rozha One (`--t-stat`) | Identity moment, matches the mockup, read once, not live-ticking |
| Outbox length, bytes in and out, retries, sync counters, network monitor, timestamps, claim values, IDs | Geist Mono, tabular | Live or exact data. Must not jitter, must look technical |

---

## 6. Shape, space and surface

### 6.1 Radii (avoid the uniform-rounding tell)

| Token | px | Use |
| --- | --- | --- |
| `--r-xs` | 8 | Inputs inside a dense table |
| `--r-sm` | 12 | Buttons, chips' container, inputs, icon tiles |
| `--r-md` | 18 | Cards |
| `--r-lg` | 28 | Main panels (assistant, point-cloud frame) |
| `--r-pill` | 999 | State chips, toggles, avatar |

Nested radius rule: inner radius = outer radius minus padding. A card inside a panel must not have the same radius as the panel.

### 6.2 Spacing

4-px base. Scale: 4, 8, 12, 16, 24, 32, 48, 72. Panels pad 24 to 32. Screens breathe: if two panels feel cramped, remove a panel rather than shrink the gap.

### 6.3 Clay without gradients

Claymorphism here means soft, tactile surfaces built from **tone steps plus layered shadows**, not glossy gradients.

- **Light mode:** surface sits on bg with two soft outer shadows (one close, one wide), tinted with the deep ink at low alpha, plus a 1 px inner top highlight and a faint inner bottom shade.
- **Dark mode:** shadows disappear against dark. Use lightness steps (`bg` to `surface` to `raised`), a 1 px `--line` hairline, and a faint 1 px inner top highlight.
- No outline strokes around shapes as decoration. Borders are hairlines only, and only when they separate.

### 6.4 Density and hierarchy

- One focal element per screen. Everything else recedes by tone, not size.
- Numbers that matter (outbox length, bytes in and out, claim count) get the largest size on their panel, in the face assigned in 5.4.
- Avoid the three-up icon-card grid, centred hero blocks, and equal-weight card walls. Those are the layouts models fall back to.

### 6.5 Components at a glance (enhancement)

| Component | Spec |
| --- | --- |
| Icon tile | 40 px square, `--r-sm`, fill `--tint` (light) or `--raised` (dark), icon 20 px in `--text-muted`. Never a saturated fill |
| Summary tile (Home) | `--r-md`, `--surface`, clay shadow. Numeral in `--t-stat`, label in `--t-small` `--text-muted`, one 20 px icon top right in `--text-muted` (the conflicts tile uses the coral diamond) |
| State chip | `--r-pill`, tinted fill (see 4.6), shape mark 10 px plus label in `--text`, `--t-micro` |
| Activity row | Icon tile, title (`--t-body` 500) with a `--t-small` subline in `--text-muted`, time in Geist Mono on the right, state shape mark at the far right |
| Button, primary | `--accent` fill, `--on-accent` label, `--r-sm`, press scale 0.97, hover `--accent-hover` |
| Search / command field | `--r-md`, `--surface`, hairline, placeholder "Ask anything...", a `Ctrl K` key hint in two small `--raised` keycaps |
| Avatar | `--r-pill`, `--deco` fill, initials in deep ink |
| Focus ring | 2 px `--accent`, 2 px offset. Never removed |

---

## 7. Motion

### 7.1 Two personalities

| Personality | Used for | Feel |
| --- | --- | --- |
| **Breathing** | Ambient state: queued pulse, idle cloud drift, presence indicator | Slow, even, almost unnoticeable (3 to 6 s cycles, sine in-out) |
| **Springy** | Direct interaction: press, open, drop, conflict "pull together" | Fast start, soft settle (exponential-out or spring) |

### 7.2 Tokens (proposals; tune by eye)

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entering, expanding (Tushar's exponential feel) |
| `--ease-in-out-soft` | `cubic-bezier(0.37, 0, 0.63, 1)` | Breathing, crossfades |
| `--ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Colour and opacity changes |
| `--dur-micro` | 140 ms | Press, hover |
| `--dur-ui` | 260 ms | Panels, rows, tooltips |
| `--dur-large` | 520 ms | Screen and cloud transitions |
| `--dur-breathe` | 4.5 s | Ambient loop |
| Spring (Motion library) gentle | stiffness 240, damping 28 | Panels, cards |
| Spring lively | stiffness 420, damping 22 | Press release, conflict pull-together |

### 7.3 Craft rules (from Emil Kowalski's published design-engineering skill, paraphrased)

- Use CSS **transitions** rather than keyframes for dynamic UI, because transitions can be interrupted and retargeted mid-flight.
- Entering things ease **out**, not in.
- Press feedback is a small scale (around 0.97) on press with a short ease-out.
- If a crossfade between two states looks off, a tiny blur during the swap (2 px, never above about 20 px) can bridge it.
- Match animation personality to the component; do not animate what does not need it.

### 7.4 Point cloud states

- **Local to queued:** ring fills to a half disc as the point warms from lilac to butter, 520 ms ease-out-expo.
- **Queued:** slow breathing, scale 1.00 to 1.12, 4.5 s.
- **Synced:** one ripple ring expanding and fading over about 700 ms, colour settles to teal.
- **Conflict:** the two points shift to coral, pulse **twice** (not a strobe), then pull toward each other with the lively spring and hold with a thin tether.
- **Accessibility:** never flash more than three times per second (WCAG 2.3.1). Honour `prefers-reduced-motion`: replace pulses with a static ring outline and replace pull-together with a short fade.
- **Resting points (v2):** points with no active state sit as soft Amethyst (`--deco`) discs of varied size, as in the mockup. The four state shapes only appear on points that carry a state, so the quiet Home cloud stays quiet and the states read as events.
- **Hub nodes (v2):** the larger hub nodes (project, note, person, voice) are 28 to 36 px rounded discs with a 16 px icon, joined to neighbours by 1 px `--deco` tethers at low opacity. Tethers never animate except the conflict tether.

### 7.5 Do not

- No looping animation on text or on numbers that people read.
- No parallax, no scroll-jacking, no confetti, no bouncing icons.
- No animation longer than 600 ms for anything the user is waiting on.

---

## 8. Screens (design intent)

The interface exists to make invisible sync visible (brief). Each screen has one job.

| Screen | Job | Composition notes | Do not |
| --- | --- | --- | --- |
| **Home (quiet state)** | Reassure: what is remembered, what needs you | Left: short "today" list. Right: the point cloud, calm. One hero number (claims remembered). No alarm colours unless a conflict exists. See 8.1 for the mockup layout | Dashboard wall of widgets |
| **Memory point cloud** | The signature visual: every claim by meaning, coloured by state | Flat palette background. Points are soft discs with the state shapes from 4.5. Hover reveals claim, source, time. Subtle bloom only if it stays calm | 3D environment, skybox, glow everywhere |
| **Assistant panel** | Conversation with sources shown under every answer | Answers in Instrument Sans, `--t-body-lg`. Sources as quiet chips. Disputed answers show both versions side by side | Serif for answers (Claude's look), avatars, typing gimmicks |
| **Memory inspector** | Trust: the raw table of claims | Mono values, tier as an editable chip, status as shape plus label. Dense but breathable rows | Zebra stripes, heavy borders |
| **Conflict centre** | The demo's emotional peak (steps 7 and 8) | Two versions as equal cards, sources and authors visible, owner named, one primary action to resolve, one quiet "ask teammate" draft. Calm language | Red alert banners, exclamation marks |
| **Sync status** | Show sync is real | Per-device online toggle, outbox length in large mono, last sync, retries. Toggling offline should visibly change the room (states, counters) | Fake progress bars |
| **Activity timeline** | The story of what happened | Vertical list of events with state shapes, scrubbable | Icon confetti |
| **Network monitor** | Proof of offline on camera | One large mono number for bytes in and out. **Must read 0 during private operations.** Sparse line, nothing else | Decorative charts |

### 8.1 Home, as drawn in the mockup, and where the contract is stricter

**Layout taken from the mockup (keep):**

- Left sidebar with the wordmark on top and six destinations: Home, Memory, Activity, Projects, People, Search, each with a 20 px Lucide line icon. Active item sits on a raised pill (`--r-sm`).
- Top bar: a wide "Ask anything..." command field with a `Ctrl K` hint, and the Amethyst avatar with initials.
- Headline in the display serif on two balanced lines: "You can come back to this." Under it, one plain sentence in `--text-muted`: "I keep your projects, sources, and changes close at hand."
- A row of four summary figures: claims remembered, active projects, open conflicts, devices synced.
- Below: a Recent activity card on the left (with "See all"), and the point cloud in a `--r-lg` frame on the right.
- A status strip at the bottom of the cloud frame: state mark and "Working offline - 1 change waiting to sync" on the left, "0 B/s in" and "0 B/s out" on the right.

**Where the contract is stricter than the mockup (fix when building):**

| Mockup shows | Contract says | Fix |
| --- | --- | --- |
| Every row in Recent activity ends in an identical lilac dot | State is never colour alone, and dots must mean something | Replace each dot with the row's real state shape: ring (local), half disc (queued), solid disc (synced), diamond (conflict). The voice note row ("1 change waiting to sync") gets the butter half disc |
| The "Working offline" status uses a lilac dot | Queued is butter, half disc, slow breath | Use the queued mark. Offline is a normal state, so the strip stays quiet, but the mark must be the queued shape |
| Four equal-weight summary tiles | One focal element per screen, no equal-weight card walls | Make "claims remembered" the hero: wider tile, `--t-stat` numeral one size up. The other three recede by tone. The conflicts tile is calm until the count is above zero, then only its diamond turns coral |
| Pale lilac subline and pale lilac secondary text (about 3.5:1) | Body-size text needs 4.5:1 | Use `--text-muted` (Dolphin, 5.70) |
| Timestamps in the UI sans | Times and counters use Geist Mono, tabular | Set "10:24 AM" and the byte counters in Geist Mono |
| Tile icons (chart, folder, diamond, laptop) in four different tints | Colour only for state | Set tile icons in `--text-muted`; the conflict diamond alone carries `--state-conflict` |
| Dark mode grounds one step lighter than the tokens | Hero dark should protect point cloud contrast | Use the 4.4 tokens, or the lifted alternative listed there. Decision in section 15 |

**Proposed mapping of the other screens onto the sidebar (enhancement, not in the mockup):**

| Sidebar item | Holds |
| --- | --- |
| Home | Quiet summary, recent activity, the cloud preview |
| Memory | Full point cloud, memory inspector (toggle), and the conflict centre reached from a conflict point or the conflicts tile |
| Activity | Activity timeline, and sync status per device |
| Projects, People | Filtered views of the same claims, grouped by project or person |
| Search | Full-screen version of the "Ask anything" field, with the assistant panel |
| Status strip (every screen) | Network monitor in short form. Click expands to the full network monitor view |

**Wordmark spec.** "edge" in Rozha One 28 to 30 px, colour `--heading`, immediately followed (0.25em gap, shared baseline) by "memory" in Instrument Sans 400 at about 0.8 of the size, colour `--text-muted`. No icon, no underline, no gradient. Minimum clear space equals the x-height of "edge" on all sides. Product name is still an open decision (section 15); the lockup pattern survives a rename.

**Microcopy rules**

- Plain, calm, first person for the assistant. Short sentences. No exclamation marks, no "Oops", no emoji.
- Show the source every time: "The client's email says the 16th. You said the 18th on set."
- Conflicts are "disputed" or "two sources disagree". Never "error" or "failed".
- Offline is a normal state: "Working offline. 1 change waiting to sync."
- Never mention ADHD or any diagnosis. Tell the experience, not the label.
- Approved lines from the mockup: "You can come back to this." and "I keep your projects, sources, and changes close at hand." Summary labels are lowercase, plain nouns: "claims remembered", "active projects", "open conflicts", "devices synced".

---

## 9. Tokens (copy into the repo)

```css
/* tokens.css. Self-hosted fonts only; no remote @import. */
@font-face { font-family: "Rozha One";            src: url("/fonts/RozhaOne-Regular.woff2") format("woff2");             font-weight: 400;     font-display: swap; }
@font-face { font-family: "Instrument Sans";      src: url("/fonts/InstrumentSans-Variable.woff2") format("woff2");      font-weight: 400 700; font-display: swap; }
@font-face { font-family: "Geist Mono";           src: url("/fonts/GeistMono-Variable.woff2") format("woff2");           font-weight: 100 900; font-display: swap; }
/* Fallback B for display, uncomment only if the display serif fights the clay shapes:
@font-face { font-family: "Bricolage Grotesque"; src: url("/fonts/BricolageGrotesque-Variable.woff2") format("woff2");   font-weight: 200 800; font-display: swap; }
*/

:root {
  color-scheme: light dark;
  --font-display: "Rozha One", "Chonburi", "DM Serif Display", ui-serif, serif; /* headline voice only */
  --font-ui:      "Instrument Sans", ui-sans-serif, sans-serif;
  --font-mono:    "Geist Mono", ui-monospace, monospace;

  --r-xs: 8px; --r-sm: 12px; --r-md: 18px; --r-lg: 28px; --r-pill: 999px;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-soft: cubic-bezier(0.37, 0, 0.63, 1);
  --ease-standard: cubic-bezier(0.25, 0.1, 0.25, 1);
  --dur-micro: 140ms; --dur-ui: 260ms; --dur-large: 520ms; --dur-breathe: 4.5s;
}

/* Light (default): Linen ground, Dolphin ink and accent, Amethyst decoration */
:root {
  --bg: #FDF1E2;  --surface: #FFF8EE;  --raised: #FFFCF6;  --tint: #F5E6EE;
  --line: #E7D9CB; --text: #2B2140;  --heading: #4B3A66;  --text-muted: #655A7C;
  --accent: #655A7C; --accent-hover: #574B6D; --on-accent: #FDF1E2;
  --deco: #AB92BF; /* decoration only, never text */
  --state-local: #74529A; --state-queued: #A87A14; --state-synced: #1C8580; --state-conflict: #C13C3B;
  --shadow-clay:
    0 1px 2px rgb(43 33 64 / 0.06),
    0 10px 28px rgb(43 33 64 / 0.08),
    inset 0 1px 0 rgb(255 255 255 / 0.7),
    inset 0 -2px 4px rgb(43 33 64 / 0.04);
}

/* Dark follows the system unless the user forces light */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #241E32; --surface: #2F2840; --raised: #3A3250; --tint: #3A3250;
    --line: #4A4163; --text: #FDF1E2; --heading: #FDF1E2; --text-muted: #B7ADC9;
    --accent: #C9B4DC; --accent-hover: #D9C9E8; --on-accent: #241E32;
    --deco: #AB92BF;
    --state-local: #AB92BF; --state-queued: #F1DF88; --state-synced: #77E0D3; --state-conflict: #F68482;
    --shadow-clay: inset 0 1px 0 rgb(255 255 255 / 0.05), 0 0 0 1px var(--line);
  }
}
/* Explicit dark override */
:root[data-theme="dark"] {
  --bg: #241E32; --surface: #2F2840; --raised: #3A3250; --tint: #3A3250;
  --line: #4A4163; --text: #FDF1E2; --heading: #FDF1E2; --text-muted: #B7ADC9;
  --accent: #C9B4DC; --accent-hover: #D9C9E8; --on-accent: #241E32;
  --deco: #AB92BF;
  --state-local: #AB92BF; --state-queued: #F1DF88; --state-synced: #77E0D3; --state-conflict: #F68482;
  --shadow-clay: inset 0 1px 0 rgb(255 255 255 / 0.05), 0 0 0 1px var(--line);
}

body { background: var(--bg); color: var(--text); font: 400 15px/24px var(--font-ui); }

/* Type roles */
.t-display, .t-h1, .t-stat { font-family: var(--font-display); font-weight: 400; font-synthesis: none; color: var(--heading); text-wrap: balance; letter-spacing: -0.01em; }
.t-display { font-size: 48px; line-height: 52px; }
.t-h1      { font-size: 34px; line-height: 40px; }
.t-stat    { font-size: 34px; line-height: 36px; }
.t-h2, .t-h3 { font-family: var(--font-ui); font-weight: 600; }
.t-h2 { font-size: 26px; line-height: 32px; }
.t-h3 { font-size: 20px; line-height: 28px; }
.t-mono { font: 400 13px/20px var(--font-mono); font-variant-numeric: tabular-nums; }

/* Tinted state chip (no gradient) */
.chip { border-radius: var(--r-pill); font: 500 12px/16px var(--font-ui); letter-spacing: 0.02em; color: var(--text); }
.chip[data-state="local"]    { background: color-mix(in oklch, var(--state-local)    16%, var(--surface)); }
.chip[data-state="queued"]   { background: color-mix(in oklch, var(--state-queued)   16%, var(--surface)); }
.chip[data-state="synced"]   { background: color-mix(in oklch, var(--state-synced)   16%, var(--surface)); }
.chip[data-state="conflict"] { background: color-mix(in oklch, var(--state-conflict) 16%, var(--surface)); }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

If the team adopts Tailwind v4, map these tokens into `@theme` so utilities (`bg-surface`, `text-muted`) read the same variables. Tailwind v4 and CSS Color 4 both support OKLCH natively, and the hex values above can be re-expressed in OKLCH without visual change. A starting mapping:

```css
@theme inline {
  --color-bg: var(--bg);           --color-surface: var(--surface);
  --color-raised: var(--raised);   --color-tint: var(--tint);
  --color-line: var(--line);       --color-ink: var(--text);
  --color-heading: var(--heading); --color-muted: var(--text-muted);
  --color-accent: var(--accent);   --color-on-accent: var(--on-accent);
  --color-deco: var(--deco);
  --color-local: var(--state-local);       --color-queued: var(--state-queued);
  --color-synced: var(--state-synced);     --color-conflict: var(--state-conflict);
  --font-display: var(--font-display);     --font-sans: var(--font-ui);
  --font-mono: var(--font-mono);
  --radius-xs: 8px; --radius-sm: 12px; --radius-md: 18px; --radius-lg: 28px;
}
```

---

## 10. Skills, plugins and libraries (as of Sep 30, 2026)

### 10.1 Design skills, ranked

Figures are from the Skillselion directory (updated Sep 28 to 29, 2026), which ranks by real installs from the skills.sh registry and GitHub. "Stars" are for the repository that bundles the skill.

| # | Skill | Repo | Stars | Installs | What it gives us | Fit for this project |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `frontend-design` | anthropics/skills | 175k | 862k | Anthropic's official anti-slop skill: bans generic fonts, pushes distinctive choices | **Good base, with one caution.** It tells the model to pick a *bold* aesthetic extreme, which one community commenter said produced garish, neon results. Always pair it with this file's calm tone |
| 2 | `vercel-react-best-practices` | vercel-labs/agent-skills | 30.9k | 694k | React and Next.js performance rules | **Yes.** Point cloud performance matters |
| 3 | `web-design-guidelines` | vercel-labs/agent-skills | 30.9k | 613k | Audits code against web interface guidelines (accessibility, UX quality) | **Yes, as the pre-ship check** |
| 4 | `design-taste-frontend` | Leonxlnx/taste-skill | 84.6k | 451k | Metric-driven anti-generic taste rules | Optional. See overlap warning |
| 5 | `ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | 125k | 347k | A searchable reference library of styles, palettes, fonts | Useful as a *reference*, not the engine |
| 6 | `high-end-visual-design` | taste-skill | 84.6k | 334k | Premium-agency polish rules | Skip. Pushes toward showy |
| 7 | `redesign-existing-projects` | taste-skill | 84.6k | 330k | Upgrade existing generic UI | Later, for audits |
| 8 | `vercel-composition-patterns` | vercel-labs/agent-skills | 30.9k | 324k | Avoids boolean-prop component sprawl | Nice for the shared component library |
| 9 | `minimalist-ui` | taste-skill | 84.6k | 307k | Editorial minimal, warm monochrome, bento grids | **Skip.** Its warm-monochrome and bento defaults fight our Linen and Dolphin palette and our no-generic-grid rule |
| 10 | `industrial-brutalist-ui` | taste-skill | 84.6k | 286k | Raw terminal aesthetic | **Skip.** Opposite of the brief |

Other skills that came up strongly:

| Skill | Repo | Why it matters here |
| --- | --- | --- |
| **impeccable** | pbakaus/impeccable | Builds on Anthropic's skill. One skill, 23 commands, curated anti-patterns, and a **standalone CLI with 61 deterministic rules** that scans HTML, CSS, JSX, TSX, Vue and Svelte for AI-tells and accessibility problems (`npx impeccable detect src/`, needs Node 22.18+). `/impeccable teach` and `/impeccable document` write `PRODUCT.md` and `DESIGN.md`. One guide reported it crossing about 64.7k stars in March 2026; I could not verify a September figure |
| **emil-design-eng** (and the rest of the set) | emilkowalski/skills | Animation and polish: correct curves, durations, interruptible transitions, plus `animate`, `animation-vocabulary`, `apple-design`, `find-animation-opportunities`, `pick-ui-library`, `prototype`. Directly serves the springy and breathing motion brief |
| **stop-slop**, **shadcn/improve** | hardikpandya, shadcn | Listed among the most-searched skills on Skillselion; I did not read them in detail |
| **avoid-ai-design** | funboy322/avoid-ai-design | Audits and rewrites code that already looks AI-made; flags the "tasteful" defaults too (cream and terracotta, mono chrome) |
| **Antigravity Awesome Skills** | sickn33/antigravity-awesome-skills | 1,400 to 2,400+ skills installable for Antigravity and Claude Code with `npx antigravity-awesome-skills`. The catalog includes `ui-lint`, `ui-tokens`, `design-system`, `ui-motion`, `ui-score`, `baseline-ui`, `fixing-motion-performance`, and a `antigravity-design-expert` skill aimed at glassmorphism and spatial, weightless UI. Too floaty and glassy for us |
| **GSAP official skills** | (already available in this environment) | Timelines, plugins, React hook, ScrollTrigger. Useful only if we choose GSAP over Motion |

### 10.2 Recommended stack for this project

1. **impeccable** as the main design engine. It owns the critique, polish and the anti-slop CLI, and it understands a `DESIGN.md`.
2. **emil-design-eng** for every motion decision and motion review.
3. **web-design-guidelines** as the last check before a screen is called done.
4. **vercel-react-best-practices** for the point cloud and live-data screens.
5. Anthropic's **frontend-design** is optional *if* you install impeccable (impeccable builds on it). If you use both, expect duplicated rules.
6. **Do not** install both `ui-ux-pro-max` and `taste-skill` as style engines. A September 2026 roundup recommends choosing one main style engine, because overlapping skills give the model conflicting rules about fonts and you get a muddled mix.
7. **New in v2, expect friction with the purple and the serif.** Skills and scanners are tuned against "purple gradient" and "cream" tells, and some will also try to replace a display serif with a sans. When a finding is about the hue or about the display face rather than about a gradient, contrast, or a real bug, the file wins (rule zero). Record each accepted finding under section 14 so the team can see it was deliberate.

**Install commands (from the sources; run and verify in your own tool):**

```bash
# Anthropic frontend-design
npx skills add https://github.com/anthropics/skills --skill frontend-design

# Impeccable (Claude Code plugin route)
/plugin marketplace add pbakaus/impeccable
# or, tool-agnostic
npx skills add pbakaus/impeccable
# Standalone slop and a11y scanner
npx impeccable detect src/

# Emil Kowalski skills: see https://github.com/emilkowalski/skills

# Vercel skills: https://github.com/vercel-labs/agent-skills

# Antigravity catalog (defaults to ~/.gemini/antigravity/skills)
npx antigravity-awesome-skills --antigravity
```

**Safety:** skills are instruction files that steer your agent. Read each `SKILL.md` before installing, especially community ones.

### 10.3 Libraries

| Need | Choice | Why |
| --- | --- | --- |
| Styling | **Tailwind CSS v4** | OKLCH-native, pairs with our tokens (mapping in section 9) |
| Components | **shadcn/ui** (Radix or Base UI primitives) | Copy-paste source the agent can read and we fully own. Cited at 109k+ stars by March 2026 |
| Motion (UI) | **Motion** (formerly Framer Motion) | Springs, layout animation, good React fit |
| Motion (timelines) | GSAP, only if needed | Official skills exist |
| Toasts | **Sonner** | Well regarded; Emil's skill documents it |
| Point cloud | **three.js with react-three-fiber, drei, postprocessing** | From my own knowledge, not checked for star counts. Standard way to render points in a React or Tauri window |
| 3D coordinates | **umap-js** or PCA | From the brief |
| Tokens at scale | **Style Dictionary** (as used by junoui) | One source of truth for light, dark and future palettes |
| Palette tooling | **Atmos** or **Adobe Leonardo** | OKLCH ramps and contrast targeting |
| Icons | **Lucide** or **Phosphor**, bundled, one stroke weight | From my own knowledge. **No emoji ever.** The mockup uses a Lucide-style 1.5 px line set |

**Reference repos, not dependencies:** `@pastel-palette/tailwindcss` (kawaii OKLCH pastel system, moderate chroma 0.08 to 0.18) for softness calibration; `junoput/junoui` (dark-first OKLCH tokens where colour encodes status only, with a soft palette and a colour-blind palette) for semantic-state thinking.

### 10.4 What I could not verify

- **Reddit:** I could not retrieve Reddit threads directly. The community signal above comes from recent roundups and directories (Medium, Substack, Skillselion, Snyk). One dissenting voice (a Russian-language forum commenter, not Reddit) said the official frontend-design skill gave them garish results and plain Claude gave cleaner ones.
- **Star counts drift and differ by source and date.** For example, taste-skill appears as about 83k in one March guide, 25k in a May ranking, and 84.6k on Skillselion in September. Treat stars as rough popularity, not quality.
- **Reference apps:** I did not pull screenshots of ixigo, GuitarTuna or osu!. Section 3 follows Tushar's description.
- **Fonts:** I did not test Bricolage Grotesque against the clay surfaces, and v2 adds a second untested choice: Rozha One is a best match for the mockup's display face, not a confirmed identification. Do both tests on day 1 (section 12) before locking.
- **Library star counts** other than shadcn/ui were not checked.
- **Colour numbers in v2:** contrast ratios and colour-blind distances were computed for this project. The colour-blind simulation is an approximation (Viénot-style matrices), so confirm the four states by eye in both modes on day 1.

---

## 11. The AI-slop checklist

Sources agree on the signature. A screen fails review if it has any of these:

**Tells from the research**
- Inter, Roboto, Arial or system fonts as the visible voice
- Purple gradients, especially on white
- Gradient text on headings
- Side-tab accent borders (a coloured stripe on the left of a card)
- Three-up icon cards and other predictable component patterns
- "Tasteful default" palettes: cream with terracotta, monochrome chrome
- Identical rounded corners on everything, identical card weight everywhere

**Tells from Tushar's own list**
- Emoji used as icons or decoration
- Decorative gradients anywhere
- "That weird outline": glow outlines, double strokes, outlined shapes that do nothing
- Chopped, cramped fonts and cramped composition

**Tells specific to this product**
- A 3D background behind the cloud
- Alarm styling for conflicts (red banners, shaking, exclamation marks)
- Fake data (progress bars, charts) that does not come from the real system
- Copy that sounds like a mascot

**Tells added in v2 (the purple palette's own failure modes)**
- Purple used as a gradient, glow or shadow tint anywhere. Purple is flat, or it is absent
- Everything lilac: state marks that are all the same purple dot, so state disappears (the mockup's activity dots are the example, see 8.1)
- Pastel lilac used as body text or as a label colour on Linen (2.48 fails)
- The display serif used outside a single big line: in cards, tables, buttons, chips, or assistant answers
- A serif on live numbers (outbox, bytes, counters) that should be mono
- Adding terracotta, brown or a warm orange "to warm it up". The warmth is already in Linen
- Stationery look: soft everywhere and no precision. Every screen needs at least one real, exact number or source on it

---

## 12. Build order (design first, implementation once there is something to build on)

Aligned with the brief's week plan and the dependency that Tushar's wiring waits on Tanishk's backend until day 5.

| Day | Design work | Implementation work |
| --- | --- | --- |
| 1 | Lock palette and type: render one test panel in both modes with the three fonts and the four state colours; check the colour-blind states by eye. **v2 additions:** compare Rozha One against the display candidates in 5.2 on the headline, decide the dark depth (4.4 note), confirm local vs accent read as different things. Sketch the conflict centre first | Tauri shell, `tokens.css`, self-hosted fonts, theme toggle, `impeccable detect` wired as a check |
| 2 | Finish component spec (chip, row, card, button, input; the 6.5 table is the starting point) | Inspector and assistant panel on mock data in the claim shape from the brief |
| 3 | Point cloud motion storyboard (four states, plus the resting Amethyst cloud) | Cloud prototype with fake `{id, x, y, z, state}` points, then UMAP coordinates |
| 4 | Conflict centre and sync status polish; mid-point cut-line check | Conflict centre, sync status UI, network monitor UI |
| 5 | Microcopy pass | Wire every surface to live data |
| 6 | Motion polish, dark and light parity | Bug fixes, feature freeze |
| 7 | Pitch deck and film motion graphics | Motion graphics for the film |

**Cut lines (mirroring the brief):** if the 3D cloud is not ready, ship the 2D version with the same shapes and colours. The state language in 4.5 works in 2D unchanged.

---

## 13. Rules for agents (copy into CLAUDE.md or the shared conventions file)

```
DESIGN RULES (source of truth: DESIGN.md, v2 Linen / Dolphin / Amethyst)
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
```

---

## 14. Review checklist (before a screen is "done")

- [ ] Works in dark and light, both look finished
- [ ] Only tokens from section 9 are used
- [ ] Text passes contrast (body at least 4.5:1, large text and graphics at least 3:1)
- [ ] Each state is distinguishable by shape and motion without colour
- [ ] Zero network requests (open the network monitor)
- [ ] No item from the section 11 checklist
- [ ] Motion respects reduced-motion and the flash limit
- [ ] Copy follows the voice rules and never names a diagnosis
- [ ] `impeccable detect` is clean, or every finding is deliberately accepted
- [ ] The display serif appears only on the hero headline, H1, wordmark and Home stat numerals
- [ ] No Amethyst text, no purple gradient, no all-lilac state marks
- [ ] At least one exact number or source is visible on the screen (guards against the stationery look)

**Accepted findings log (add a line each time a scanner finding is deliberately kept):**

- [overused-font] on Instrument Sans (line 10) and Geist Mono (line 17) in `tokens.css`: Deliberately kept per DESIGN.md Section 5.2 & 5.4. Instrument Sans provides humanist warmth for UI body text without generic system font feel; Geist Mono tabular numbers are non-negotiable for live system counters and claims.

---

## 15. Open decisions for the team

- [ ] Confirm the display face against the mockup on day 1 (Rozha One vs Chonburi vs Gloock vs DM Serif Display). If the exact mockup face is known and licensable, swap `--font-display`
- [ ] Confirm the display serif against clay surfaces on day 1 (fallback: Bricolage Grotesque, or Satoshi plus Geist Mono)
- [ ] Dark depth: tokens in 4.4 (deeper aubergine) or the mockup's lifted grounds (one step lighter)
- [ ] Is the added coral acceptable as the one new hue, or should conflict use a warmer amber-red from the Cookie Crumble family?
- [ ] Product name (brief: "not Jarvis"). The wordmark lockup "edge" plus "memory" is a working title. The name may suggest a logo style
- [ ] Icon set: Lucide vs Phosphor (the mockup reads as Lucide)
- [ ] Who owns voice (ASR and TTS)? The brief lists them without an owner, and the assistant panel depends on them
- [ ] Sync status, activity timeline and network monitor: the interface table assigns them to Tanishk, the day-4 plan to Tushar. Suggested: Tushar builds the UI, Tanishk exposes the data
- [ ] Sidebar mapping in 8.1 (Memory holds cloud, inspector and conflict centre; Activity holds timeline and sync status): confirm or restructure
- [ ] Parked for later: hand-drawn and pastel shader backgrounds
- [x] ~~Do we want Instrument Serif anywhere at all?~~ Resolved in v2: no, the display serif replaces it

---

## 16. Sources

- Anthropic: Improving frontend design through Skills (claude.com/blog/improving-frontend-design-through-skills)
- Claude Cookbook: Prompting for frontend aesthetics (platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- Skillselion design skills ranking, updated Sep 28 to 29, 2026 (skillselion.com/design)
- pbakaus/impeccable and its CLI README (github.com/pbakaus/impeccable)
- emilkowalski/skills and emil-design-eng (github.com/emilkowalski/skills)
- funboy322/avoid-ai-design (github.com/funboy322/avoid-ai-design)
- sickn33/antigravity-awesome-skills (github.com/sickn33/antigravity-awesome-skills)
- Snyk: Top 8 Claude Skills for UI/UX Engineers (Mar 2026)
- Medium: 9 Best UI Skills for Claude Code in 2026 (Sep 2026)
- The Adpharm and MindStudio on avoiding AI slop with a design system (Apr to May 2026)
- Font roundups: Mantlr, DiverseKit, Muzli, Made Good Designs, Jukebox Print (2025 to 2026)
- OKLCH tooling: Atmos, Adobe Leonardo, lawvs/pastel, junoput/junoui
- Stack context: buildmvpfast.com (Tailwind 4, Motion, shadcn/ui), Mar to May 2026
- Colour measurements in sections 4 and 4.4: computed for this project (OKLab and WCAG 2.x relative luminance; colour-blind simulation with Viénot-style matrices), v1 and v2 runs
- Owner's reference mockup and palette card (Linen / Dolphin / Amethyst), Sep 30, 2026
- Brief: PS3 Technical Brief, Edge Memory Layer (Sep 24, 2026)

---

## Appendix A. v1 blue-cream token set (archived, not in use)

Kept so nothing from v1 is lost and the team can revert or A/B the palette. **Do not use these in the app.** They no longer match section 9.

**Dark mode (v1 hero)**

| Token | Hex | Role | Contrast vs `bg` |
| --- | --- | --- | --- |
| `--bg` | `#091423` | Page | n/a |
| `--surface` | `#121F30` | Panels and cards | n/a |
| `--raised` | `#1C2A3C` | Popovers, hovered rows | n/a |
| `--line` | `#2F3E52` | Hairlines | n/a |
| `--text` | `#F1EBDC` | Primary text | 15.5 |
| `--text-muted` | `#9AAEBC` | Secondary text | 8.1 |
| `--accent` | `#7EB3D1` | Buttons, links, focus (Rock Blue family) | 8.2 |
| `--state-local` | `#9780B4` | Device-only | 5.3 |
| `--state-queued` | `#F1DF88` | Waiting to sync | 13.8 |
| `--state-synced` | `#77E0D3` | Synced | 11.8 |
| `--state-conflict` | `#F68482` | Disputed | 7.5 |

**Light mode (v1)**

| Token | Hex | Role | Contrast vs `bg` |
| --- | --- | --- | --- |
| `--bg` | `#F5EEDD` | Page (Merino) | n/a |
| `--surface` | `#FBF6EC` | Panels and cards | n/a |
| `--raised` | `#FFFBF3` | Popovers, hovered rows | n/a |
| `--tint` | `#FDF1E2` | Assistant surfaces (Linen) | n/a |
| `--line` | `#DDD7C9` | Hairlines | n/a |
| `--text` | `#15273E` | Primary text (deep navy ink) | 13.1 |
| `--text-muted` | `#485D73` | Secondary text | 5.9 |
| `--accent` | `#16587B` | Buttons, links, focus (Venice Blue) | 6.7 |
| `--state-local` | `#5E457A` | Device-only | 7.0 |
| `--state-queued` | `#AC7D1B` | Waiting to sync | 3.2 |
| `--state-synced` | `#1C8580` | Synced | 3.9 |
| `--state-conflict` | `#C13C3B` | Disputed | 4.6 |

**v1 colour-blind worst cases:** dark, queued vs synced under protanopia, 10.9 (comfortable); light, queued vs conflict under deuteranopia, 7.6 (borderline, shape must back it up).

**v1 headline face:** Bricolage Grotesque variable, weights 200 to 800, for headings and big moments, with the scale `--t-display` 48/52 600, `--t-h1` 34/40 600, `--t-h2` 26/32 600, `--t-h3` 20/28 600.
