# Real Estate App

A modern, full-stack real estate listing platform built with Next.js 16, featuring property listings, news articles, image galleries, and a responsive design with dark/light mode support.

## Overview

This project is a comprehensive real estate application that demonstrates modern web development practices using Next.js 16 App Router, React 19.2, TypeScript, and Prisma ORM. The application provides a complete solution for browsing properties, viewing detailed listings with image galleries, and staying updated with real estate news.

## Features

**Property Management**

- Browse properties with server-side pagination
- Detailed property pages with image galleries
- Lightbox modal for viewing property photos
- Promoted and latest properties carousels
- Property filtering and search capabilities

**News Section**

- Latest news articles with grid layout
- Individual news detail pages
- Pagination support
- Date formatting utilities

**User Experience**

- Dark/light mode with system preference detection
- Responsive design (mobile-first approach)
- Loading skeletons for better perceived performance
- Empty states for improved user feedback
- Full keyboard navigation support
- ARIA attributes for accessibility

**Performance**

- Server Components for optimal performance
- Image optimization with Next.js Image component
- Suspense boundaries for progressive loading
- Optimized event handlers with React 19.2 features

## Tech Stack

### Core Technologies

- **Next.js** 16.0.1 - React framework with App Router
- **React** 19.2.0 - UI library
- **TypeScript** 5 - Type safety
- **Tailwind CSS** 4 - Utility-first CSS framework

### Database & ORM

- **MySQL** - Relational database
- **Prisma** 6.18.0 - Next-generation ORM

### UI Components

- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library
- **Embla Carousel** - Carousel component library

### Additional Libraries

- **next-themes** - Theme management
- **tailwind-merge** - Merge Tailwind CSS classes
- **class-variance-authority** - Component variants
- **sonner** - Toast notifications

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **MySQL** database (local or remote)

## Getting Started

### 1\. Clone the Repository

```
git clone <repository-url>
cd 01_real-estate
```

### 2\. Install Dependencies

```
npm install
# or
yarn install
# or
pnpm install
```

### 3\. Environment Setup

Create a `.env` file in the root directory:

```
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
```

Replace the connection string with your MySQL database credentials.

### 4\. Database Setup

Generate Prisma Client:

```
npx prisma generate
```

Run database migrations:

```
npx prisma migrate dev
```

(Optional) Seed the database with sample data:

```
npx prisma db seed
```

### 5\. Start Development Server

```
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (frontend)/              # Frontend application routes
│   │   ├── page.tsx             # Homepage
│   │   ├── proprietes/          # Property routes
│   │   │   ├── page.tsx         # Properties listing
│   │   │   └── [id]/            # Property detail page
│   │   ├── news/                # News routes
│   │   │   ├── page.tsx         # News listing
│   │   │   └── [id]/            # News detail page
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── terms/               # Terms of service
│   │   └── privacy-policy/      # Privacy policy
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   └── not-found.tsx            # 404 page
├── components/
│   ├── frontend/                 # Frontend components
│   │   ├── layout/               # Layout components
│   │   ├── proprietes/          # Property components
│   │   ├── news/                 # News components
│   │   ├── skeletons/            # Loading skeletons
│   │   └── ...                   # Shared components
│   ├── providers/                # React context providers
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── queries/                  # Database query functions
│   ├── actions/                  # Server actions
│   ├── utils/                    # Utility functions
│   ├── constants.ts              # Application constants
│   ├── prisma.ts                 # Prisma client
│   └── fonts.ts                  # Font configuration
├── types/                         # TypeScript type definitions
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── seed.ts                   # Database seeder
│   └── migrations/               # Database migrations
└── public/                        # Static assets
```

## Database Schema

### User

- `id` - Unique identifier
- `email` - User email (unique)
- `password` - Hashed password
- `name` - User name
- `createdAt` - Account creation timestamp

### Property

- `id` - Unique identifier
- `name` - Property name
- `price` - Property price
- `area` - Property area in m²
- `address` - Property address
- `description` - Property description
- `image` - Main property image URL
- `promoted` - Featured property flag
- `createdAt` - Listing creation timestamp
- `ownerId` - Foreign key to User
- Relations: `owner` (User), `gallery` (PropertyImage\[\])

### PropertyImage

- `id` - Unique identifier
- `url` - Image URL
- `alt` - Alt text for accessibility
- `caption` - Image caption
- `order` - Display order
- `propertyId` - Foreign key to Property
- `createdAt` - Image upload timestamp
- Relations: `property` (Property)

### News

- `id` - Unique identifier
- `title` - News article title
- `description` - News article content
- `image` - News article image URL
- `createdAt` - Article creation timestamp
- `updatedAt` - Article last update timestamp

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

### Required

- `DATABASE_URL` - MySQL database connection string

Example:

```
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
```

## Deployment

### Vercel (Recommended)

1.  Push your code to GitHub
2.  Import your project to Vercel
3.  Configure the `DATABASE_URL` environment variable
4.  Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

1.  Set the `DATABASE_URL` environment variable
2.  Run `npm run build`
3.  Start the server with `npm run start`

## Key Implementation Details

### React 19.2 Features

- **useEffectEvent**: Optimized event handlers in Modal component
- **Server Components**: Default rendering strategy for better performance
- **Suspense Boundaries**: Progressive loading with improved UX

### Performance Optimizations

- Server-side rendering for SEO
- Next.js Image component for optimized images
- Lazy loading for non-critical resources
- Suspense boundaries for code splitting

### Code Organization

- Clear separation of concerns (queries, actions, components)
- Reusable component architecture
- Type-safe database operations
- Consistent error handling patterns

## License

This project is built for educational purposes.

---

**Note**: This project demonstrates modern Next.js 16 patterns, including Server Components, App Router, Prisma ORM, TypeScript best practices, React 19.2 features, and accessibility considerations.
