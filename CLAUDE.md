# Escrow Trust Platform

## Project Overview
A full-stack escrow SaaS platform enabling secure transactions between buyers, sellers, and agencies. Built with React + Vite + Tailwind CSS frontend and a Node.js/Express + Prisma + Supabase backend.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Auth**: Supabase Auth (Google OAuth + email/password)
- **Backend**: Express.js, Prisma ORM, PostgreSQL (Supabase)
- **State**: React hooks (useState, useEffect), Context API for Toast/Language

## Directory Structure
```
src/
├── App.tsx              # Main router, DashboardLayout, Header
├── main.tsx             # Vite entry point
├── types/index.ts       # TypeScript types (UserRole, EscrowStatus, etc.)
├── lib/api.ts           # API client with fetch wrappers
├── hooks/               # useAuth, useAnimations
├── i18n/                # Internationalization (en, es, fr, de, etc.)
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx  # Role-based nav sidebar with role switcher
│   │   └── AccountHeader.tsx
│   ├── escrow/
│   │   ├── EscrowCard.tsx
│   │   └── EscrowTimeline.tsx
│   └── ui/              # Reusable: Toast, LoadingSpinner, ErrorBoundary, etc.
└── pages/               # 41 page components (see below)
```

## Design System
- **Background**: `#ECF4E9` (light green tint) for dashboard pages
- **Primary accent**: `#DDFC95` / `#A3E635` (lime green)
- **Dark green**: `#305941`
- **Badge green**: `#BCF49D`
- **Cards**: `bg-white rounded-2xl shadow-sm p-6`
- **Hover**: `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`
- **Hero/Landing**: Dark `#0a0a0a` background with lime accents
- **Auth pages**: 50/50 split (black left, white right)

## User Roles
- `SELLER` — Dashboard, Orders, Wallet, Disputes, Analytics, API, Settings
- `BUYER` — Overview, Explore, Transactions, Wallet, Profile
- `AGENCY` — Overview, Bulk Orders, Finance, Disputes, Reports, API
- `MERCHANT` — Legacy merchant dashboard
- `COURIER` — Delivery management
- `ADMIN` — Platform admin, user management, KYC

## Routing Architecture
Public routes render directly. Dashboard routes render inside `<DashboardLayout>` which includes `<Sidebar>` and `<Header>`.

### Key Routes
- `/` → Landing page
- `/login`, `/register` → Auth pages
- `/seller`, `/seller/transactions`, `/seller/wallet`, `/seller/disputes`, `/seller/analytics`, `/seller/api`, `/seller/settings`
- `/buyer`, `/buyer/transactions`, `/buyer/explore`, `/buyer/wallet`
- `/agency`, `/agency/bulk-orders`, `/agency/finance`, `/agency/disputes`, `/agency/reports`, `/agency/api`
- `/escrow/:id` → Escrow detail (physical/digital)
- `/dispute/:id` → Dispute detail

## Animation Standards
- **Entrance**: `fadeInUp` — cards fade in and slide up on page load
- **Stagger**: Each card delayed by `100ms × index`
- **Hover lift**: Cards lift 4px with shadow on hover
- **Hover scale**: Buttons scale to 1.02
- **Progress bars**: Animate width from 0 to target on mount
- **Pulse**: Urgent banners pulse subtly

## Figma Reference
Design screenshots are stored at:
```
.gemini/antigravity/brain/[conversation-id]/scratch/figma_screens/
01_landing_full.png through 23_disputes.png
```

## Development
```bash
npm run dev     # Start Vite dev server (localhost:5173)
npm run build   # Production build
```

## Important Notes
- All imports use the `@/` path alias (configured in tsconfig + vite)
- The Sidebar component determines nav items based on `currentRole`
- Role switching is handled via `localStorage('escrow_role')` + state
- Supabase auth session is checked on DashboardLayout mount
- The landing page uses `useTranslation()` for i18n support
- Status badges follow consistent color coding:
  - Completed: `bg-green-100 text-green-800`
  - Pending: `bg-yellow-100 text-yellow-800`
  - Disputed: `bg-red-100 text-red-800`
  - Active: `bg-blue-100 text-blue-800`
