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
- Advanced property filtering:
  - Filter by location (address search)
  - Filter by property type (Apartment, House, Commercial)
  - Filter by price range (min/max price)
  - URL-based filter persistence
  - Zod validation for filter inputs
  - Clear filters functionality
- Hero search form on homepage
- Property statistics (total listings, average price per m², recent additions)

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

**Settings Management (Admin)**

- Application-wide settings configuration
- Auto-save on blur for each field
- Per-field error handling (errors don't clear each other)
- Settings fields: app name, description, address, phone, email
- Logo uploader (placeholder - to be implemented)
- Map preview (placeholder - to be implemented)
- Singleton pattern (single settings record)
- Partial update support for efficient data saving
- Real-time validation with Zod schemas

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
- **zod** - Schema validation for form inputs and filters

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
npx prisma generate --schema=./server/prisma/schema.prisma
```

Run database migrations:

```
npx prisma migrate dev --schema=./server/prisma/schema.prisma
```

(Optional) Seed the database with sample data:

```
npx prisma db seed --schema=./server/prisma/schema.prisma
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
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   ├── forgot-password/      # Password reset request
│   │   ├── reset-password/       # Password reset form
│   │   └── layout.tsx           # Auth layout
│   ├── (backend)/                # Backend/admin routes
│   │   ├── dashboard/            # Dashboard page
│   │   ├── profile/               # User profile page
│   │   ├── settings/             # Settings page
│   │   ├── users/                # Users management
│   │   ├── proprietes-area/      # Properties management
│   │   ├── notifications/        # Notifications
│   │   └── layout.tsx            # Backend layout
│   ├── (frontend)/               # Frontend application routes
│   │   ├── page.tsx              # Homepage
│   │   ├── proprietes/           # Property routes
│   │   │   ├── page.tsx          # Properties listing
│   │   │   └── [id]/             # Property detail page
│   │   ├── news/                 # News routes
│   │   │   ├── page.tsx          # News listing
│   │   │   └── [id]/             # News detail page
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── terms/                # Terms of service
│   │   ├── privacy-policy/       # Privacy policy
│   │   └── layout.tsx            # Frontend layout
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   ├── error.tsx                  # Global error boundary
│   └── not-found.tsx             # 404 page
├── features/
│   ├── frontend/                 # Frontend feature components
│   │   ├── proprietes/           # Property components
│   │   │   ├── hooks/            # Custom hooks (usePropertyFilters)
│   │   │   ├── details/          # Property detail components
│   │   │   ├── LatestProprietes.tsx
│   │   │   ├── PromotedProprietes.tsx
│   │   │   ├── ProprietesWrapper.tsx
│   │   │   └── ...               # Other property components
│   │   ├── news/                 # News components
│   │   │   ├── detail/           # News detail components
│   │   │   ├── LatestNews.tsx
│   │   │   └── NewsGridtem.tsx
│   │   ├── contact/              # Contact components
│   │   │   ├── ContactData.tsx
│   │   │   ├── ContactFormular.tsx
│   │   │   └── ContactMap.tsx
│   │   ├── about/                # About components
│   │   ├── Hero.tsx              # Homepage hero section
│   │   ├── CarouselCustum.tsx    # Custom carousel
│   │   └── EmptyState.tsx        # Empty state component
│   └── backend/                  # Backend feature components (admin panel)
│       ├── profile/              # User profile management
│       │   ├── edit/             # Edit profile form
│       │   │   └── EditProfile.tsx
│       │   ├── delete/           # Delete confirmation
│       │   │   └── DeleteConfirm.tsx
│       │   ├── ProfileCards.tsx
│       │   ├── ProfileContent.tsx
│       │   ├── ProfileActionsButtons.tsx
│       │   └── ProfileView.tsx
│       └── settings/             # Application settings
│           ├── SettingsForm.tsx  # Settings form with auto-save
│           └── SettingsView.tsx  # Settings page view
├── components/
│   ├── auth/                     # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   ├── PasswordInput.tsx
│   │   └── FormWrapper.tsx
│   ├── backend/                  # Backend-specific components
│   │   └── layout/               # Backend layout components
│   │       ├── header/           # Header components
│   │       ├── sidebar/          # Sidebar components
│   │       ├── PageHeader.tsx
│   │       └── MainContent.tsx
│   ├── frontend/                 # Frontend-specific components
│   │   ├── layout/               # Layout components
│   │   │   ├── header/           # Header components
│   │   │   └── footer/           # Footer components
│   │   └── skeletons/            # Loading skeletons
│   ├── shared/                   # Shared reusable components
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   ├── CustomInput.tsx
│   │   ├── CustomSelect.tsx
│   │   ├── IconButton.tsx
│   │   ├── ErrorFormMessages.tsx
│   │   ├── BackButton.tsx
│   │   ├── PaginationControls.tsx
│   │   ├── CustumImage.tsx
│   │   └── Logo.tsx
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       └── ...                   # Other UI components
├── server/
│   ├── actions/                  # Server actions
│   │   ├── auth.ts               # Authentication actions
│   │   ├── properties.ts         # Property actions
│   │   ├── profile.ts            # Profile management actions
│   │   ├── settings.ts           # Settings update action
│   │   ├── users.ts              # User management actions
│   │   └── sendMessage.ts       # Contact form action
│   ├── queries/                  # Database query functions
│   │   ├── properties.ts
│   │   ├── news.ts
│   │   ├── settings.ts          # Settings query function
│   │   └── users.ts
│   ├── auth/                     # Authentication utilities
│   │   ├── session.ts            # Session management
│   │   ├── password.ts           # Password hashing
│   │   ├── resetToken.ts         # Password reset tokens
│   │   └── getCurrentUserFromSession.ts
│   ├── mail/                     # Email functionality
│   │   ├── sendContactEmail.tsx
│   │   ├── sendPasswordResetEmail.tsx
│   │   ├── templates/           # Email templates
│   │   └── transporter.ts
│   ├── prisma/                   # Prisma configuration
│   │   ├── schema.prisma         # Database schema
│   │   ├── seed.ts               # Database seeder
│   │   └── migrations/           # Database migrations
│   ├── schemas/                  # Zod validation schemas
│   │   ├── auth.ts               # Authentication schemas
│   │   ├── contact.ts
│   │   ├── profile.ts            # Profile validation schemas
│   │   ├── propertyFilters.ts
│   │   ├── settings.ts           # Settings validation schemas
│   │   └── user.ts               # User validation schemas
│   ├── utils/                    # Server utility functions
│   │   └── zod.ts                # Zod error formatting
│   ├── prisma.ts                 # Prisma client instance
│   └── prisma-errors.ts          # Prisma error handling
├── hooks/                        # Custom React hooks
│   └── useOutsideClick.ts
├── lib/
│   ├── utils/                    # Utility functions
│   │   ├── date.ts              # Date formatting
│   │   ├── pagination.ts         # Pagination utilities
│   │   ├── parseSearchParams.ts # URL search params parsing
│   │   └── sortingParcer.ts     # Sorting utilities
│   ├── constants.ts              # Application constants
│   ├── fonts.ts                  # Font configuration
│   └── utils.ts                  # General utilities
├── providers/                    # React context providers
│   └── ThemeProvider.tsx
├── types/                        # TypeScript type definitions
│   ├── action-state.ts           # Generic action state type
│   ├── auth.ts                   # Authentication types
│   ├── profile.ts                # Profile types
│   ├── properties.ts             # Property types
│   ├── settings.ts               # Settings types
│   └── user.ts                   # User types
└── public/                       # Static assets
    └── fonts/                    # Custom fonts
```

## Database Schema

### PropertyType

Enum values:

- `Apartment` - Apartment listings
- `House` - House listings
- `Commercial` - Commercial property listings

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
- `type` - Property type (Apartment, House, Commercial)
- `promoted` - Featured property flag
- `latitude` - Geographic latitude
- `longitude` - Geographic longitude
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

### Settings

- `id` - Unique identifier
- `appName` - Application name
- `appDescription` - Application description
- `address` - Contact address
- `phone` - Contact phone number
- `email` - Contact email address
- `logo` - Logo URL or path (optional)
- `createdAt` - Settings creation timestamp
- `updatedAt` - Settings last update timestamp
- **Note**: Singleton pattern - only one settings record exists

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

- **Activity Component**: Used for show/hide filter functionality with state preservation
- **useEffectEvent**: Optimized event handlers in Modal component
- **Server Components**: Default rendering strategy for better performance
- **Suspense Boundaries**: Progressive loading with improved UX
- **useReducer**: State management for complex filter forms

### Property Filtering

The application implements a comprehensive filtering system:

- **Filter Components**: `PropertyTypeFilter` with `usePropertyFilters` hook
- **State Management**: `useReducer` for filter state with actions (SET_LOCATION, SET_TYPE, SET_MIN_PRICE, SET_MAX_PRICE, CLEAR_ALL)
- **Validation**: Zod schema (`propertyFiltersSchema`) validates filter inputs and ensures maxPrice > minPrice
- **URL Persistence**: Filters are stored in URL query parameters for shareable links
- **Server-side Filtering**: Prisma queries with dynamic `where` clauses based on filter parameters
- **Activity Integration**: `ProprietesFilterWrapper` uses React Activity component to show/hide filters while preserving state
- **Context-aware Navigation**: `clearRoute` prop allows different navigation behavior on homepage vs properties page

### Performance Optimizations

- Server-side rendering for SEO
- Next.js Image component for optimized images
- Lazy loading for non-critical resources
- Suspense boundaries for code splitting

### Code Organization

- Clear separation of concerns (queries, actions, components, schemas)
- Reusable component architecture
- Type-safe database operations
- Consistent error handling patterns
- Custom hooks for complex state logic (`usePropertyFilters`)
- Utility functions for parsing and transforming data (`parsePropertySearchParams`)
- Zod schemas for runtime validation

### Settings Management

The application includes a comprehensive settings management system:

- **Auto-save on Blur**: Each field saves automatically when user leaves the field (onBlur event)
- **Partial Updates**: Only changed fields are sent to the server, reducing network traffic
- **Per-field Error Handling**: Validation errors are tracked per field and don't interfere with each other
- **Form Layout**: Two-column grid layout (left: logo placeholder, app name, description, phone, email; right: address, map placeholder)
- **Singleton Pattern**: Database ensures only one settings record exists
- **Type Safety**: Full TypeScript support with `UpdateSettings`, `PartialUpdateSettings`, and `CurrentSettings` types
- **Validation**: Zod schemas validate both partial (single field) and full (all fields) updates
- **Server Actions**: Uses Next.js server actions with `useTransition` for loading states
- **Cache Invalidation**: `revalidatePath` ensures UI updates after successful saves
- **Pending Features**: Logo uploader and map preview are placeholders for future implementation

## License

This project is built for educational purposes.

---

**Note**: This project demonstrates modern Next.js 16 patterns, including Server Components, App Router, Prisma ORM, TypeScript best practices, React 19.2 features, and accessibility considerations.
