# Crypto Market Analyzer 📈
A modern web application for tracking and analyzing cryptocurrency prices in real time using Binance's public API.

- Repository: [Click](https://github.com/Alex0-8/Crypto_Market)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- Theme Manegement: next-themes
- Data Fetching & Caching: TanStack Query (@tanstack/react-query)
- Charts: Recharts
- Animations: Framer Motion
- Deployment: Vercel (pending)

# Architecture and Folder Structure
I chose this structure to improve reusability and scalability.

# Current Features
- Theme Management (Light / Dark mode)
  Implemented using next-themes.
  This was my first time using the library, and I initially faced some challenges   related to hydration and theme synchronization. After reviewing the
  documentation for Tailwind, shadcn/ui, and youtube resources, I was
  able to correctly configure and integrate it into the project.
- Header component
  - Entry animation using Framer Motion
  - Search bar for filtering cryptocurrencies
  - Theme toggle (light / dark)
- Sidebar
  - Displays a list of cryptocurrencies
  - Search-based filtering
  - Ability to mark cryptocurrencies as favorites
  - Favorites are displayed at the top of the list
  - Mobile-friendly behavior with overlay and animations
- Main panel
  - Currently a placeholder
  - Will be replaced with detailed crypto information and charts

# Use of AI in Development
I used Grok throughout the project:

- Brainstorming layout ideas and architectural decisions
- Initial generation of TypeScript
- Code suggestions for components, as this is my first time using Next.js

I always reviewed and adapted the generated code to ensure quality and correct typing.

# Next Steps / In Progress

- [x] Initial setup with Next.js + Tailwind + TypeScript
- [x] TanStack Query Provider configuration
- [x] Fetch prices from Binance API
- [x] Responsive layout with sidebar + main panel
- [x] Crypto list with searchbar
- [ ] Detail panel with historical chart
- [ ] Interactive buy/sell simulator
- [x] Animations with Framer Motion
- [x] Dark mode toggle
- [ ] Deployment to Vercel
