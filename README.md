# 🛒 Shopping List Application

Modern, high-performance shopping list app built with **React**, **TypeScript**, **Express SSR**, and **TanStack Query**.

## 🏗️ Architecture

This project uses **Vertical Slice Architecture** with advanced patterns:

```
src/
├── features/                    # Feature slices
│   └── shopping-list/
│       ├── api/                 # API layer
│       │   ├── shopping-list.api.ts       # Pure API calls
│       │   └── shopping-list.queries.ts   # TanStack Query hooks
│       ├── components/          # Feature components
│       ├── types/               # TypeScript types
│       └── index.ts             # Public API
├── lib/                         # Shared libraries
│   ├── api-client.ts            # Axios instance
│   └── query-client.ts          # TanStack Query config
└── shared/                      # Shared components/utils

server/
└── index.ts                     # Express SSR server
```

## 🚀 Tech Stack

- **Framework**: Express + Vite SSR
- **UI Library**: React 19 (Functional Components + Hooks)
- **Language**: TypeScript
- **State Management**: TanStack Query v5 (React Query)
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Build Tool**: Vite 7
- **Runtime**: Node.js with tsx

## ✨ Features

### 🎯 Advanced TanStack Query Patterns

1. **Query Keys Factory** - Centralized, type-safe query key management
2. **Optimistic Updates** - Instant UI updates before server confirmation
3. **Automatic Cache Invalidation** - Smart refetching strategy
4. **Server-Side Prefetching** - SSR with hydration (NO window hacks!)
5. **Custom Hooks per Feature** - Encapsulated business logic

### 🏛️ Architecture Highlights

- **Vertical Slices** - Features are self-contained modules
- **Separation of Concerns** - API layer, hooks layer, component layer
- **Type Safety** - End-to-end TypeScript
- **SSR without window** - Clean hydration via HydrationBoundary

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your API URL
```

## 🔧 Configuration

Edit `.env`:

```env
PORT=3000
NODE_ENV=development
API_BASE_URL=http://localhost:3001/api
```

## 🏃 Running Locally

### Development Mode (with HMR)

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### Production Build

```bash
# Build both client and server
npm run build

# Start production server
npm start
```

### Type Checking

```bash
npm run typecheck
```

## 📝 API Integration

This app integrates with the Shopping List API:
- **Repository**: https://github.com/ofek-exco/shopping-list-api
- **Base URL**: Configure in `.env`

### API Endpoints Used

```
GET    /api/shopping-items          # Fetch all items
GET    /api/shopping-items/:id      # Fetch single item
POST   /api/shopping-items          # Create item
PATCH  /api/shopping-items/:id      # Update item
DELETE /api/shopping-items/:id      # Delete item
PATCH  /api/shopping-items/:id/toggle  # Toggle checked
```

## 🎨 Design Reference

Design from Figma:
https://www.figma.com/design/NDOq3UegrFEAcO6ZjZA3Hh/Shopping-list

## 🧩 Adding New Features

Follow the Vertical Slice pattern:

```bash
src/features/new-feature/
├── api/
│   ├── new-feature.api.ts       # API calls
│   └── new-feature.queries.ts   # TanStack Query hooks
├── components/
│   └── NewFeature.tsx           # Components
├── types/
│   └── new-feature.types.ts     # Types
└── index.ts                     # Public exports
```

## 🔥 TanStack Query Patterns

### Query Keys Factory

```typescript
export const shoppingListKeys = {
  all: ['shopping-list'] as const,
  lists: () => [...shoppingListKeys.all, 'list'] as const,
  list: (filters?) => [...shoppingListKeys.lists(), { filters }] as const,
  details: () => [...shoppingListKeys.all, 'detail'] as const,
  detail: (id) => [...shoppingListKeys.details(), id] as const,
}
```

### Custom Hooks with Optimistic Updates

```typescript
export function useCreateShoppingItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: shoppingListApi.createItem,
    onMutate: async (newItem) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: shoppingListKeys.lists() })

      // Optimistically update cache
      // ...
    },
    onError: (err, newItem, context) => {
      // Rollback on error
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: shoppingListKeys.lists() })
    },
  })
}
```

## 🛠️ Development

### Project Structure

```
.
├── server/              # Express SSR server
├── src/
│   ├── features/        # Feature slices
│   ├── lib/             # Shared libs
│   ├── shared/          # Shared components
│   ├── App.tsx          # Root component
│   ├── entry-client.tsx # Client entry
│   └── entry-server.tsx # SSR entry
├── public/              # Static assets
└── docs/                # Documentation
```

## 📚 Key Dependencies

```json
{
  "react": "^19.2.4",
  "@tanstack/react-query": "^5.90.21",
  "express": "^5.2.1",
  "axios": "^1.13.5",
  "vite": "^7.1.7",
  "tailwindcss": "^4.1.13"
}
```

## 🚀 Performance Features

- ✅ Server-Side Rendering (SSR)
- ✅ React 19 hydration
- ✅ Vite HMR (Fast Refresh)
- ✅ Code splitting
- ✅ Optimistic UI updates
- ✅ Smart caching strategy

## 🤝 Contributing

This is a technical assignment project. For production use, consider:

- Adding authentication
- Error boundaries
- Loading skeletons
- E2E tests (Playwright)
- CI/CD pipeline

## 📄 License

Private project for technical assessment.

---

Built with ❤️ using modern React patterns and best practices.
