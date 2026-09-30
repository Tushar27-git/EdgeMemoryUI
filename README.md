# Edge Memory UI

> A private, offline-first memory layer for AI assistants — showcase interface built for **Code Cubicle 6.0 (Problem Statement 03: Qdrant Edge)**.

Designed and developed following [DESIGN.md](./DESIGN.md) (v2 Linen / Dolphin / Amethyst edition).

---

## Overview

Edge Memory is an offline-first assistant interface that remembers what you were told, notices what you are forgetting, and never silently guesses or overwrites a fact when sources disagree.

- **Stack:** React 19 + TypeScript + Vite + Three.js + Lucide Icons + Vanilla CSS Tokens
- **Design System:** Strictly遵循 [DESIGN.md](./DESIGN.md)
  - **Palette:** Linen (`#FDF1E2`), Dolphin (`#655A7C`), Amethyst (`#AB92BF`), and deep aubergine dark base (`#241E32`).
  - **Typography:** Self-hosted **Rozha One** (display serif for headlines & Home stat numerals), **Instrument Sans** (UI & body), and **Geist Mono** (tabular numbers, claims, IDs, timestamps).
  - **State Encoding:** Distinct shapes and motions for all states (Local = ring, Queued = half-disc with slow breathing pulse, Synced = solid disc, Conflict = coral diamond with tether).
  - **Zero Network Traffic:** All fonts and assets are bundled on-device; network monitor reads `0 B/s` during private on-device operations.

---

## Key Surfaces & Features

1. **Home Screen (`HomeView`):**
   - Wordmark lockup (`edge` display serif + `memory` sans).
   - Balanced headline: *"You can come back to this."*
   - Summary stat cards: Claims remembered (1,284), active projects (12), open conflicts (8), devices synced (3).
   - Recent activity list with live semantic state shapes and Geist Mono timestamps.
   - Interactive 3D Point Cloud preview with hub nodes and status strip (*"Working offline - 1 change waiting to sync"*, *0 B/s in / 0 B/s out*).

2. **Memory View (`MemoryView`):**
   - **3D Point Cloud:** Three.js interactive canvas projecting claims in 3D with hover inspection tooltips.
   - **Memory Inspector:** Filterable claims table with real schema contracts and interactive sync tier switching (`device` / `my_devices` / `team`).
   - **Conflict Centre:** Prominent side-by-side dispute comparison (e.g. Sharma Edit Oct 16 email vs Oct 18 voice note) with owner resolution actions and *"Ask teammate"* draft copying.

3. **Activity & Synchronization (`ActivityView`):**
   - Mesh node status (Daily Laptop, Teammate Laptop, Hub).
   - Persistent dual-write SQLite outbox queue inspector with simulated sync draining.
   - Chronological audit log with filter pills.

4. **Projects & People (`ProjectsView`, `PeopleView`):**
   - Clustered view of claims organized by Project and Person entities.
   - Proactive memory facts (e.g. Riya's birthday, Ladakh SSD location).

5. **Assistant Panel (`AssistantView`):**
   - Conversational assistant with cited sources (`[gmail:...]`, `[whatsapp:...]`, `[voice:...]`).
   - Disputed conflict alert cards and hyperfocus nudge triggers.

6. **Network Isolation Monitor (`NetworkMonitorModal`):**
   - Demonstrates zero bytes in / zero bytes out during local inference and vector searches.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## License

Proprietary / Built for Code Cubicle 6.0 Hackathon.
