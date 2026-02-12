# Shopping List Application

A server-side rendered shopping list app built with React, Vite, and styled-components.

## Prerequisites

- Node.js 18+
- npm

## Quick Start

### 1. Start Backend API

First, start the backend server from the `shopping-list-api` repository:

```bash
cd shopping-list-api
npm install
npm start
```

Backend will run on `http://localhost:3000`

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

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
- **Validation**: Zod (runtime validation)
- **Build**: Vite
- **Server**: Express + Vite SSR
- **Backend**: Separate API service from `shopping-list-api` repository (port 3000)

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
