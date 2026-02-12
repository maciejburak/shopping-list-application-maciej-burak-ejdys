# Shopping List Application

A server-side rendered shopping list app built with React, Vite, and styled-components.

## Prerequisites

- Node.js 18+
- npm

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking

## Tech Stack

- **Frontend**: React 18, React Router 7
- **Styling**: styled-components with SSR
- **State**: TanStack Query (React Query), React Context API
- **Build**: Vite
- **Server**: Express + Vite SSR
- **Backend**: Separate API service (port 3000)

## Project Structure

```
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── providers/         # Context providers
│   └── styles/            # Global styles
├── server/
│   ├── controllers/       # SSR controllers
│   ├── services/         # API integration
│   └── helpers/          # Utility functions
```
