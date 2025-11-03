# Real Estate App

A modern, full-stack real estate listing website built with Next.js 16, featuring property listings, news, dark/light mode, and responsive design.

## 🚀 Features

- **Property Listings**: Browse properties with pagination, filtering, and detailed property pages
- **Promoted Properties**: Featured properties carousel on homepage
- **Latest Properties**: Latest listings carousel on homepage
- **News Section**: Latest news with image, title, and description
- **Dark/Light Mode**: Theme toggle with system preference support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Server Components**: Optimal performance with Next.js 16 App Router
- **Database**: MySQL with Prisma ORM
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Database**: MySQL
- **ORM**: Prisma 6.18.0
- **Theme**: next-themes
- **Carousel**: Embla Carousel React

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- MySQL database (local or remote)

## 🔧 Installation

**Clone the repository**

**Install dependencies**

**Set up environment variables**

Create a `.env` file in the root directory:

**Set up the database**

**Run the development server**

**Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── (frontend)/          # Frontend routes
│   │   ├── page.tsx         # Homepage
│   │   ├── proprietes/      # Properties listing
│   │   │   ├── page.tsx     # Properties page with pagination
│   │   │   └── [id]/        # Property detail page
│   │   ├── news/            # News page
│   │   └── ...              # Other pages (about, contact, etc.)
│   ├── layout.tsx           # Root layout with theme provider
│   └── loading.tsx          # Global loading component
├── components/
│   ├── frontend/            # Frontend components
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── proprietes/      # Property-related components
│   │   ├── news/            # News components
│   │   ├── PaginationControls.tsx
│   │   └── Spinner.tsx
│   ├── providers/           # React providers (Theme)
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── queries/             # Database read operations
│   │   └── properties.ts
│   ├── actions/             # Server actions (mutations)
│   │   └── properties.ts
│   ├── utils/               # Utility functions
│   │   └── pagination.ts    # Pagination helpers
│   ├── constants.ts         # App constants
│   ├── prisma.ts            # Prisma client instance
│   └── fonts.ts             # Font configuration
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Database seeding script
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## 🗄️ Database Schema

### Models

- **User**: User accounts (id, email, password, name)
- **Property**: Real estate listings (id, name, price, area, address, image, promoted, ownerId)
- **News**: News articles (id, title, description, image)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features Details

### Pagination

- Server-side pagination with URL query parameters
- Configurable items per page (default: 12)
- Reusable `PaginationControls` component

### Theme System

- System preference detection
- Manual theme toggle
- Persistent theme selection
- Smooth transitions

### Property Listings

- Grid layout (responsive: 1-4 columns)
- Property cards with image, price, area, address
- Promoted badge for featured properties
- Detail page with full property information

### News Section

- Latest news with images
- Simple list layout
- Individual news pages

## 🔍 Key Components

- `**PaginationControls**`: Reusable pagination UI component
- `**RealtyListItem**`: Property card component
- `**ProprietesMeta**`: Pagination metadata and filters
- `**LatestNews**`: News listing component
- `**ThemeToggle**`: Dark/light mode toggle button
- `**Spinner**`: Loading indicator

## 🌐 Routes

- `/` - Homepage with promoted and latest properties
- `/proprietes` - Properties listing with pagination
- `/proprietes/[id]` - Property detail page
- `/news` - News listing
- `/about` - About page
- `/contact` - Contact page
- `/privacy-policy` - Privacy policy
- `/terms` - Terms of service

## 🔐 Environment Variables

Required:

- `DATABASE_URL` - MySQL connection string

## 📦 Dependencies

### Core

- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### Database

- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI

### UI & Styling

- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` - Icons
- `embla-carousel-react` - Carousel component

### Utilities

- `next-themes` - Theme management
- `clsx` & `tailwind-merge` - Class name utilities

## 🚢 Deployment

### Vercel (Recommended)

1.  Push your code to GitHub
2.  Import project to Vercel
3.  Add `DATABASE_URL` environment variable
4.  Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Set `DATABASE_URL` environment variable
- Run `npm run build`
- Start with `npm run start`

## 👤 Author

Built as a practical Next.js 16 project.

---

**Note**: This is a learning project demonstrating modern Next.js 16 patterns including Server Components, App Router, Prisma ORM, and TypeScript best practices.

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

```
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

```
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
```

```
npm install
# or
yarn install
# or
pnpm install
```

```
git clone <repository-url>
cd 01_real-estate
```
