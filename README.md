# Real Estate App

A modern, full-stack real estate listing platform built with Next.js 16, featuring property listings, news articles, image galleries, and a responsive design with dark/light mode support.

## Overview

This project is a comprehensive real estate application that demonstrates modern web development practices using Next.js 16 App Router, React 19.2, TypeScript, and Prisma ORM. The application provides a complete solution for browsing properties, viewing detailed listings with image galleries, and staying updated with real estate news.

## Features

**Property Management**

**Frontend:**
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

**Backend (Admin/Agent):**
- Complete property management system with create, edit, and delete functionality
- Server-side pagination for efficient data loading (default: 15 properties per page)
- Server-side sorting by status, createdAt, and other fields with URL-based state management
- Generic table component (`GenericTable`) for reusable data display
- Sortable columns with visual indicators (up/down arrows)
- Property status management (APPROVED, IN_REVIEW, REJECTED) with custom status badge component
- Property creation form with:
  - Property details (name, type, price, area, description)
  - Interactive map for location selection with geocoding/reverse geocoding
  - Location coordinates (latitude/longitude) for map display
  - Responsive form layout with price and area fields side by side
- Property edit form:
  - Property details editing with pre-filled form values
  - Location editing with interactive map
  - Status change support
  - **Image gallery management**:
    - Multi-image upload with drag & drop (react-dropzone)
    - Drag & drop reordering within gallery (HTML5 Drag & Drop API)
    - First image automatically set as main image
    - Visual border indicator for main image
    - Info banner explaining drag & drop functionality
    - Upload progress indicators
    - File validation (type, size, max 10 files)
    - Blob URL previews during upload
    - Automatic cleanup of blob URLs after upload
    - Prevents form submission while uploads are in progress
- Owner-based filtering (agents see only their properties, admins see all)
- Authorization system with ownership helpers (`requireAuth`, `requireOwnerOrAdmin`)
- Scroll position reset on navigation (similar to pagination behavior)

**News Section**

- Latest news articles with grid layout
- Individual news detail pages
- Server-side pagination support
- Server-side sorting by title, createdAt, and updatedAt
- Date formatting utilities
- Default image fallback for news articles

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
- Logo uploader with dark/light mode support (IPFS/Pinata integration)
- Interactive map with Leaflet for location selection
- Geocoding and reverse geocoding (address ↔ coordinates)
- Social media links: Facebook, Instagram, X (Twitter), LinkedIn, YouTube
- Location coordinates (latitude/longitude) for map display
- Dynamic settings used throughout frontend (replaces hardcoded constants)
- Singleton pattern (single settings record)
- Partial update support for efficient data saving
- Real-time validation with Zod schemas
- Server-side file validation for logo uploads

**User Management (Admin)**

- Complete user management system with create, edit, and delete functionality
- Server-side pagination for efficient data loading
- Server-side sorting by role, isActive, propertyCount, and createdAt
- Generic table component (`GenericTable`) for reusable data display
- Sortable columns with visual indicators (up/down arrows)
- Current user highlighting in the users table
- User role management (ADMIN, AGENT)
- User activation/deactivation toggle
- Property count display per user
- Optimized with React.memo to prevent unnecessary re-renders
- Type-safe operations with TypeScript generics
- Server actions for user CRUD operations with Zod validation
- Session-based current user detection

**News Management (Admin)**

- Complete news management system with create, edit, and delete functionality
- Server-side pagination for efficient data loading
- Server-side sorting by title, createdAt, and updatedAt
- Generic table component (`GenericTable`) for reusable data display
- Sortable columns with visual indicators (up/down arrows)
- News image uploader with IPFS/Pinata integration
- Image upload/removal without closing modal
- Default image fallback for news articles
- Type-safe operations with TypeScript generics
- Server actions for news CRUD operations with Zod validation
- Centralized file validation utility for consistent upload handling

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
- **Leaflet & React-Leaflet** - Interactive maps with markers and geocoding
- **Nominatim API** - Free geocoding and reverse geocoding service

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
│   │   ├── news-editor/          # News editor page
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
│       ├── users/                # User management
│       │   ├── add-edit/         # Add/Edit user form
│       │   │   ├── AddNewUser.tsx
│       │   │   └── UserForm.tsx  # Generic form for create/edit
│       │   ├── table/            # Users table components
│       │   │   ├── columns.tsx   # Table column definitions
│       │   │   ├── ActionsCell.tsx # Edit/Delete actions
│       │   │   └── sortableColumns.ts # Sortable columns config
│       │   └── AllUsers.tsx       # Main users list component
│       ├── proprietes/            # Property management
│       │   ├── add-edit/          # Shared add/edit property form
│       │   │   └── PropertyForm.tsx # Generic form for create/edit
│       │   ├── form/              # Reusable form components
│       │   │   ├── DetailsCard.tsx # Property details form card
│       │   │   ├── LocationCard.tsx # Location map form card
│       │   │   ├── ImageGalleryCard.tsx # Image gallery card with upload and reordering
│       │   │   ├── ImageGalleryList.tsx # Gallery list with drag & drop reordering
│       │   │   └── ImageDropzone.tsx # Drag & drop upload zone
│       │   ├── hooks/             # Custom hooks
│       │   │   ├── usePropertyImageUpload.ts # Image upload logic hook
│       │   │   └── useImageDragAndDrop.ts # Drag & drop reordering hook
│       │   ├── table/             # Properties table components
│       │   │   ├── columns.tsx    # Table column definitions
│       │   │   ├── ActionsCell.tsx # Edit/Delete actions
│       │   │   └── sortableColumns.ts # Sortable columns config
│       │   ├── ui/                # Property UI components
│       │   │   └── PropertyStatusBadge.tsx # Status badge component
│       │   └── AllProprietes.tsx  # Main properties list component
│       ├── news/                 # News management
│       │   ├── add-edit/         # Add/Edit news form
│       │   │   ├── AddNews.tsx
│       │   │   ├── NewsForm.tsx  # Generic form for create/edit
│       │   │   └── NewsImageUploader.tsx # News image upload component
│       │   ├── table/            # News table components
│       │   │   ├── columns.tsx   # Table column definitions
│       │   │   ├── ActionsCell.tsx # Edit/Delete actions
│       │   │   └── sortableColumns.ts # Sortable columns config
│       │   ├── delete/           # Delete confirmation
│       │   │   └── DeleteConfirm.tsx
│       │   └── AllNews.tsx       # Main news list component
│       └── settings/             # Application settings
│           ├── SettingsForm.tsx  # Settings form with auto-save
│           ├── SettingsView.tsx  # Settings page view
│           ├── logo/             # Logo uploader components
│           │   ├── LogosUploader.tsx
│           │   └── SingleLogoUploader.tsx # Single logo uploader with validation
│           └── map/              # Map components
│               └── MapClickHandler.tsx
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
│   │   ├── GenericTable.tsx      # Generic reusable table component
│   │   ├── CustumImage.tsx
│   │   ├── Logo.tsx
│   │   ├── LogoWithSettings.tsx  # Server component wrapper for Logo
│   │   ├── MapDisplay.tsx         # Shared Leaflet map component
│   │   └── CustumMarkerIcon.tsx  # Custom Leaflet marker icon
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
│   │   ├── news.ts               # News management actions
│   │   ├── uploadImagePinata.ts  # Centralized IPFS image upload action
│   │   ├── deleteImagePinata.ts  # IPFS image deletion (unpin) action
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
│   │   ├── getCurrentUserFromSession.ts
│   │   └── ownership.ts          # Property ownership authorization helpers
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
│   │   ├── property.ts           # Property validation schemas (create/update)
│   │   ├── propertyFilters.ts
│   │   ├── settings.ts           # Settings validation schemas
│   │   ├── user.ts               # User validation schemas
│   │   └── news.ts               # News validation schemas
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
│   │   ├── social.ts            # Social media platform utilities
│   │   └── file.ts              # File validation utilities
│   ├── constants.ts              # Application constants
│   ├── fonts.ts                  # Font configuration
│   ├── utils.ts                  # General utilities
│   ├── geocoding.ts              # Geocoding and reverse geocoding helpers
│   └── metadata.ts              # Dynamic metadata generation helpers
├── providers/                    # React context providers
│   └── ThemeProvider.tsx
├── types/                        # TypeScript type definitions
│   ├── action-state.ts           # Generic action state type
│   ├── auth.ts                   # Authentication types
│   ├── profile.ts                # Profile types
│   ├── properties.ts             # Property types
│   ├── settings.ts               # Settings types
│   ├── user.ts                   # User types
│   └── news.ts                   # News types
└── public/                       # Static assets
    └── fonts/                    # Custom fonts
```

## Database Schema

### PropertyType

Enum values:

- `Apartment` - Apartment listings
- `House` - House listings
- `Commercial` - Commercial property listings

### Role

Enum values:

- `ADMIN` - Administrator role
- `AGENT` - Real estate agent role

### User

- `id` - Unique identifier
- `email` - User email (unique)
- `password` - Hashed password
- `name` - User name (optional)
- `role` - User role (ADMIN, AGENT)
- `isActive` - Account active status (default: true)
- `lastLogin` - Last login timestamp (optional)
- `passwordResetToken` - Password reset token (optional)
- `passwordResetTokenExpiry` - Password reset token expiry (optional)
- `createdAt` - Account creation timestamp
- Relations: `properties` (Property\[\])

### PropertyStatus

Enum values:

- `APPROVED` - Property is approved and visible on frontend
- `IN_REVIEW` - Property is pending approval (default for new properties)
- `REJECTED` - Property has been rejected

### Property

- `id` - Unique identifier
- `name` - Property name
- `type` - Property type (Apartment, House, Commercial) (optional)
- `price` - Property price
- `area` - Property area in m² (optional)
- `address` - Property address (optional)
- `lat` - Geographic latitude (optional)
- `lng` - Geographic longitude (optional)
- `description` - Property description (optional)
- `image` - Main property image URL (optional)
- `status` - Property status (APPROVED, IN_REVIEW, REJECTED) (default: IN_REVIEW)
- `promoted` - Featured property flag (default: false)
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
- `address` - Contact address (auto-updated via map reverse geocoding)
- `phone` - Contact phone number
- `email` - Contact email address
- `logo_dark` - Dark mode logo URL or path (optional, IPFS)
- `logo_light` - Light mode logo URL or path (optional, IPFS)
- `lat` - Geographic latitude (optional)
- `lng` - Geographic longitude (optional)
- `facebook` - Facebook page URL (optional)
- `instagram` - Instagram profile URL (optional)
- `x` - X (Twitter) profile URL (optional)
- `linkedin` - LinkedIn company page URL (optional)
- `youtube` - YouTube channel URL (optional)
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

### Optional

- `NEXT_PUBLIC_SITE_URL` - Public site URL for metadata and email templates (defaults to `https://realestatepro.com`)
- `PINATA_JWT` - Pinata JWT token for IPFS file uploads (required for logo, news, and property image uploads)
- `PINATA_LOGO_GROUP_ID` - Pinata group ID for logo uploads (required for logo uploads)
- `PINATA_NEWS_IMAGE_GROUP_ID` - Pinata group ID for news image uploads (required for news image uploads)
- `PINATA_PROPERTY_IMAGE_GROUP_ID` - Pinata group ID for property image uploads (required for property gallery uploads)
- `EMAIL_USER` - Email address for sending emails (contact form, password reset)
- `EMAIL_PASS` - Email password for SMTP authentication

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
- Request-level memoization with React `cache()` for settings queries
- Dynamic metadata generation for improved SEO
- Shared map component for backend and frontend (code reuse)
- React.memo for preventing unnecessary re-renders (AllUsers component)
- Server-side pagination and sorting for efficient data loading
- Type-safe generic components with TypeScript constraints
- Optimized event handlers with useCallback hooks
- Centralized file validation utility for consistent upload handling
- IPFS/Pinata integration for image storage (logos, news images, and property galleries)
- Environment-based configuration for Pinata group IDs
- Automatic image cleanup from Pinata when properties are deleted
- Custom hooks for complex state logic (`usePropertyImageUpload`, `useImageDragAndDrop`)
- Drag & drop reordering with HTML5 Drag & Drop API
- Optimized image upload with blob URL previews and automatic cleanup

### Code Organization

- Clear separation of concerns (queries, actions, components, schemas)
- Reusable component architecture
- Type-safe database operations
- Consistent error handling patterns
- Custom hooks for complex state logic (`usePropertyFilters`)
- Utility functions for parsing and transforming data (`parsePropertySearchParams`, `reverseGeocode`, `getPlatformName`)
- Zod schemas for runtime validation
- Shared components for cross-cutting concerns (MapDisplay, LogoWithSettings)
- Helper functions for metadata generation and geocoding

### User Management

The application includes a complete user management system for administrators:

- **Server-Side Operations**: All user operations (create, update, delete) use Next.js server actions
- **Generic Form Component**: `UserForm` component handles both create and edit modes with conditional rendering
- **Server-Side Pagination**: Efficient data loading with configurable page size (default: 10 users per page)
- **Server-Side Sorting**: Sortable by role, isActive, propertyCount, and createdAt with URL-based state management
- **Generic Table Component**: Reusable `GenericTable` component with TypeScript generics (`T extends { id: string }`)
- **Sortable Columns**: Configurable sortable columns with visual indicators (ChevronUp/ChevronDown icons)
- **Current User Highlighting**: Visual distinction for the currently logged-in user in the table
- **Property Count Aggregation**: Uses Prisma `_count` for efficient property counting per user
- **Performance Optimization**: `React.memo` on `AllUsers` component prevents re-renders when modals open
- **Type Safety**: Full TypeScript support with proper type constraints and validation
- **Zod Validation**: Server-side validation for all user operations with detailed error messages
- **Session Management**: Current user detection via session cookies
- **Role-Based Access**: Admin-only access with `adminGuard` middleware
- **Helper Functions**: `parseUserFormData` and `toCurrentUser` for code reusability and DRY principles

### News Management

The application includes a complete news management system for administrators:

- **Server-Side Operations**: All news operations (create, update, delete) use Next.js server actions
- **Generic Form Component**: `NewsForm` component handles both create and edit modes with conditional rendering
- **Server-Side Pagination**: Efficient data loading with configurable page size (default: 10 news items per page)
- **Server-Side Sorting**: Sortable by title, createdAt, and updatedAt with URL-based state management
- **Generic Table Component**: Reuses `GenericTable` component with TypeScript generics for consistent UI
- **Sortable Columns**: Configurable sortable columns with visual indicators (ChevronUp/ChevronDown icons)
- **Image Management**: `NewsImageUploader` component for uploading and removing news images
  - IPFS/Pinata integration for image storage
  - Client-side and server-side file validation (type, size)
  - Image upload/removal without closing modal (local state management)
  - Default image fallback for news articles
- **Centralized Image Upload**: `uploadImagePinata` server action for reusable IPFS uploads
  - Used by both logo and news image uploaders
  - Environment-based group ID configuration
  - Consistent validation and error handling
- **File Validation Utility**: Centralized `validateFile` function in `lib/utils/file.ts`
  - Reusable across all upload components
  - Consistent validation messages and error handling
- **Performance Optimization**: `React.memo` on `AllNews` component prevents re-renders when modals open
- **Type Safety**: Full TypeScript support with `AddNews`, `UpdateNews`, and `DeleteNews` types
- **Zod Validation**: Server-side validation for all news operations with detailed error messages
- **Role-Based Access**: Admin-only access with `adminGuard` middleware

### Property Management (Backend)

The application includes a comprehensive property management system for administrators and agents:

- **Server-Side Operations**: All property operations (create, update, delete) use Next.js server actions
- **Image Management**:
  - Multi-image upload to Pinata IPFS with batch processing
  - Gallery images stored in `PropertyImage` table with order field
  - First image automatically set as main image (`property.image` field)
  - Image cleanup on property deletion (unpins images from Pinata)
  - Non-blocking cleanup - property deletion continues even if Pinata delete fails
  - Parallel deletion of all images for better performance
- **Reusable Form Components**: `DetailsCard` and `LocationCard` components work with optional `property` prop for both create and edit modes
- **Server-Side Pagination**: Efficient data loading with configurable page size (default: 15 properties per page)
- **Server-Side Sorting**: Sortable by status, createdAt, and other fields with URL-based state management
- **Generic Table Component**: Reuses `GenericTable` component with TypeScript generics for consistent UI
- **Sortable Columns**: Configurable sortable columns with visual indicators (ChevronUp/ChevronDown icons)
- **Property Status Management**: 
  - Three statuses: APPROVED, IN_REVIEW (default), REJECTED
  - Custom `PropertyStatusBadge` component with color-coded status display
  - Status can be changed in edit form (optional field in update schema)
- **Property Creation Form**:
  - Property details: name, type, price, area, description
  - Interactive map for location selection with geocoding/reverse geocoding
  - Responsive layout with price and area fields side by side
  - **Image Gallery Management**:
    - Multi-image upload with drag & drop (react-dropzone)
    - Drag & drop reordering within gallery (HTML5 Drag & Drop API)
    - First image automatically set as main image (order: 0)
    - Visual border indicator for main image
    - Info banner explaining drag & drop functionality
    - Upload progress indicators and loading states
    - File validation (type, size, max 10 files per upload)
    - Blob URL previews during upload
    - Automatic cleanup of blob URLs after upload
    - Prevents form submission while uploads are in progress
    - Custom hooks for upload logic (`usePropertyImageUpload`) and drag & drop (`useImageDragAndDrop`)
    - Optimized with useCallback and useMemo to prevent unnecessary re-renders
  - Form validation with Zod schemas
- **Property Edit Form**:
  - Property details editing with pre-filled form values
  - Location editing with interactive map
  - Status change support
  - **Image Gallery Management**:
    - Loads existing images from database on edit
    - Multi-image upload with drag & drop (react-dropzone)
    - Drag & drop reordering within gallery (HTML5 Drag & Drop API)
    - First image automatically set as main image (order: 0)
    - Visual border indicator for main image
    - Info banner explaining drag & drop functionality
    - Upload progress indicators and loading states
    - File validation (type, size, max 10 files per upload)
    - Blob URL previews during upload
    - Automatic cleanup of blob URLs after upload
    - Prevents form submission while uploads are in progress
    - Custom hooks for upload logic (`usePropertyImageUpload`) and drag & drop (`useImageDragAndDrop`)
    - Optimized with useCallback and useMemo to prevent unnecessary re-renders
    - Images sorted by order when loading from database
- **Authorization System**: Centralized ownership helpers in `server/auth/ownership.ts`:
  - `requireAuth()` - Ensures user is authenticated
  - `requireOwnerOrAdmin(property, user)` - Ensures user owns property or is admin
  - Used in server actions and queries for consistent authorization
- **Owner-Based Filtering**: Agents see only their properties, admins see all properties
- **Scroll Position Management**: Scroll position resets on navigation (similar to pagination behavior)
- **Form Component Reusability**: 
  - `DetailsCard` and `LocationCard` support optional `property` prop
  - Consistent label margins between `CustomInput` and `CustomSelect` components
  - Responsive grid layout for price and area fields
- **Type Safety**: Full TypeScript support with `CreatePropertyFormData`, `UpdatePropertyFormData`, and `PropertyActionState` types
- **Zod Validation**: Server-side validation for all property operations with detailed error messages
- **Role-Based Access**: Owner or admin access required for property operations

### Settings Management

The application includes a comprehensive settings management system:

- **Auto-save on Blur**: Each field saves automatically when user leaves the field (onBlur event)
- **Partial Updates**: Only changed fields are sent to the server, reducing network traffic
- **Per-field Error Handling**: Validation errors are tracked per field and don't interfere with each other
- **Logo Upload**: Separate upload fields for dark and light mode logos with IPFS/Pinata integration
  - Client-side and server-side file validation using centralized `validateFile` utility
  - File input reset for re-uploading the same file
  - Confirmation dialog before deletion
  - Image optimization support
  - Uses centralized `uploadImagePinata` server action
- **Interactive Map**: Leaflet-based map for location selection
  - Click on map to set coordinates
  - Automatic reverse geocoding (coordinates → address)
  - Address display in map component
  - Custom marker icon
  - Geocoding via Nominatim API with English language preference
- **Social Media Links**: Optional social media profile URLs (Facebook, Instagram, X, LinkedIn, YouTube)
- **Dynamic Settings**: Settings data used throughout frontend (replaces hardcoded constants)
  - Dynamic metadata generation for SEO
  - Dynamic logo display in header/footer
  - Dynamic contact information in footer and contact page
  - Dynamic email templates (contact form, password reset)
- **Form Layout**: Two-column grid layout (left: logo uploaders, app name, description, phone, email, social links; right: interactive map with address display)
- **Singleton Pattern**: Database ensures only one settings record exists
- **Type Safety**: Full TypeScript support with `UpdateSettings`, `PartialUpdateSettings`, and `CurrentSettings` types
- **Validation**: Zod schemas validate both partial (single field) and full (all fields) updates
- **Server Actions**: Uses Next.js server actions with `useTransition` for loading states
  - Separate actions for logo upload/removal and location updates
- **Cache Invalidation**: `revalidatePath` ensures UI updates after successful saves
- **Request-level Caching**: `getSettings()` wrapped with React `cache()` for optimal performance

## License

This project is built for educational purposes.

---

**Note**: This project demonstrates modern Next.js 16 patterns, including Server Components, App Router, Prisma ORM, TypeScript best practices, React 19.2 features, and accessibility considerations.
