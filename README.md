# Security Bundle Builder

A highly responsive, production-ready React application for building a custom home security system. 

## Overview
This project allows users to construct a multi-category security bundle, selecting variants (colors) and quantities independently for each item. The application features a dynamic 4-step accordion builder, live real-time cart pricing (including bundle savings and shipping calculations), and local storage persistence.

## Features
- **Dynamic Configuration:** Everything (categories, products, prices, variants) is driven by JSON configuration. Adding a new product or category requires no code changes.
- **Granular Variant Control:** Each color/variant maintains its own independent quantity inside the global store.
- **Persistent Sessions:** Users can "Save for later", storing their exact cart quantities, swatch selections, and accordion progress to `localStorage`.
- **Responsive Architecture:** Leverages Tailwind CSS to scale flawlessly from massive 4k desktop monitors down to 375px mobile screens.
- **Production Performance:** Built with strict `React.memo` components, `useCallback`, `useMemo`, and granular Zustand selectors to eliminate unnecessary DOM re-renders.
- **Accessible & Semantic:** Full keyboard navigational support, semantic HTML markers (`<aside>`, `<main>`), distinct focus states, and deep ARIA integrations (`aria-live`, `aria-controls`).

## Architecture & Technology Stack
- **React 19 & Vite**
- **TypeScript:** Strict mode enabled, highly-typed data structures (`Product`, `Category`, `BundleSelection`, etc.)
- **TailwindCSS:** For flexible, utility-first styling.
- **Zustand:** Provides a lightweight, un-opinionated global state.
- **Lucide React:** Minimal, beautiful SVG iconography.

### State Management (`useBundleStore.ts`)
The application embraces a strict separation of concerns:
1. **Source of Truth:** Zustand stores exactly 3 values: `selections` (cart objects), `activeVariants` (the currently viewed swatch for a card), and `currentStep` (accordion progress).
2. **Derived State:** `selectors.ts` is responsible for computing derived data—grouping categories, computing bundle savings, cross-referencing product JSON—meaning the core state tree remains incredibly lean.
3. **Pure Math (`pricing.ts`):** All financial calculations are entirely decoupled from React components.

## Getting Started

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To spin up the Vite development server:
```bash
npm run dev
```

### Production Build
To run the TypeScript compiler and build the optimized bundle:
```bash
npm run build
```

## Known Limitations & Trade-offs
- **Local Storage Limitations:** Persistence is currently bound to the browser's `localStorage`. In a real-world application with authenticated users, this data should sync to a remote database.
- **Images:** Image assets are loaded from external URLs (for demonstration purposes). In a heavy production environment, these should be hosted on a CDN and served via an optimized `<picture>` tag.
