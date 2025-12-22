# Real Estate App

A modern, full-stack B2B real estate platform built with Next.js 16, connecting real estate agencies and facilitating partnerships. Features include property listings, news articles, image galleries, notification system, comprehensive dashboard analytics, and a responsive design with dark/light mode support.

## Overview

This project is a comprehensive B2B real estate application that demonstrates modern web development practices using Next.js 16 App Router, React 19.2, TypeScript, and Prisma ORM. The application provides a complete solution for connecting real estate agencies, sharing properties between partners, managing listings, and staying updated with real estate news. The platform focuses on facilitating agency-to-agency connections and collaboration.

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
- Property status management (APPROVED, IN_REVIEW, REJECTED, INACTIVE, DELETED) with custom status badge component
- Backend property filtering:
  - Filter by status (all statuses, including INACTIVE and DELETED)
  - Filter by property type (Apartment, House, Commercial)
  - Filter by promotion status (promoted/not promoted)
  - Filter by owner (admin only)
  - URL-based filter persistence
  - Dynamic filter options from constants
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
- Unsaved changes warning system:
  - `useDirtyFormModal` hook for modal forms (UserForm, NewsForm, EditProfile)
  - `WarningModal` component for custom warning dialogs
  - Prevents accidental data loss when closing forms with unsaved changes
  - Disables backdrop close to force user interaction with warning

**Authentication & Authorization**

- Session-based authentication with secure cookies
- Role-based access control (ADMIN, AGENT)
- Backend layout redirects:
  - Inactive users → `/inactive` page (in `(auth)` route group)
  - Deleted users → `/deleted` page (in `(auth)` route group)
  - Unauthenticated users → `/login` page
  - Centralized redirect logic in `app/(backend)/layout.tsx`
- User status handling:
  - Inactive users cannot access backend routes
  - Deleted users are automatically logged out
  - Force logout functionality for deleted users (`ForceLogoutButton` component)
- Request-level memoization with React `cache()`:
  - `getCurrentUserFromSession()` - Cached per request
  - `getSettings()` - Cached per request
  - Optimized prop passing from layouts to reduce duplicate queries
- Ownership helpers:
  - `requireAuth()` - Ensures user is authenticated and active
  - `requireOwnerOrAdmin(property, user)` - Ensures user owns property or is admin
  - Used in server actions and queries for consistent authorization

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
- Unsaved changes warning system:
  - `useDirtyFormModal` hook integrated into `NewsForm`
  - `WarningModal` component for custom warning dialogs
  - Prevents accidental data loss when closing forms with unsaved changes
  - Disables backdrop close to force user interaction with warning

**Notifications System**

- Real-time notification system for property and user management events
- Notification types:
  - Property created (notifies admins when agent creates property)
  - Property updated (notifies owner when admin updates, or admins when agent updates)
  - Property deleted (notifies admins when agent deletes, or owner when admin deletes)
  - Property promoted (notifies owner when admin promotes property)
  - Profile updated (notifies agent when admin updates their profile)
  - Profile deleted (notifies admins when agent deletes their profile)
- Notification dropdown in header with unread count badge
- Polling system: automatically fetches new notifications every 30 seconds when tab is active
- Visibility API integration: pauses polling when tab is inactive
- Optimistic UI updates for marking notifications as read
- Notifications page (admin only) with table view:
  - Server-side pagination and sorting
  - Status column (Read/Unread) with badges
  - Delete functionality with confirmation modal
  - Synchronized with dropdown (actions in one place reflect in the other)
- Custom event system for cross-component communication
- Server actions: `getNotifications`, `markAsRead`, `deleteNotification`
- Helper functions: `createNotification`, `createNotificationForAdmins`
- Revalidation: `revalidatePath` ensures UI synchronization between dropdown and page

**Dashboard Analytics**

- Comprehensive dashboard with multiple chart types and statistics
- Properties timeline chart with time period tabs (All time, Last 6 months, Last month, Last week)
- Properties statistics tabs:
  - Status distribution (pie chart)
  - Type distribution (pie chart)
  - Top locations (bar chart)
- Properties range charts with tabs:
  - Price range distribution (horizontal bar chart)
  - Area size distribution (horizontal bar chart)
- Price ranges: 0-50k, 50k-100k, 100k-200k, 200k-300k, 300k-500k, 500k+
- Area size ranges: 0-50 m², 50-100 m², 100-150 m², 150-200 m², 200-300 m², 300+ m²
- In-review properties table
- Online users display
- Top users by properties count
- Latest news widget
- General statistics cards
- All charts use Recharts library with responsive design
- Server-side data fetching with React `cache()` for request-level memoization
- Error boundaries and Suspense for graceful error handling

**SEO & Metadata**

- Dynamic metadata generation for all pages
- B2B-focused SEO optimization:
  - Home page: Emphasizes B2B platform for connecting agencies
  - Properties page: Highlights property sharing between partner agencies
  - About page: Focuses on agency-to-agency connections and partnerships
  - Contact page: Emphasizes B2B partnerships and agency connections
  - News page: Includes B2B partnership insights
- Fallback metadata with B2B platform description
- OpenGraph support for social media sharing
- Server-side metadata generation with `generatePageMetadata` helper
- Settings-based app name and description for dynamic SEO

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

Run database migrations (development):

```
npx prisma migrate dev --schema=./server/prisma/schema.prisma
```

For production, use:

```
npx prisma migrate deploy --schema=./server/prisma/schema.prisma
```

(Optional) Seed the database with sample data:

```
npx prisma db seed --schema=./server/prisma/schema.prisma
```

**Important Notes on Database Migrations:**

- **Development**: Use `prisma migrate dev` to create and apply migrations
- **Production**: Use `prisma migrate deploy` to apply existing migrations only
- **Migration Status**: Check migration status with `prisma migrate status`
- **Failed Migrations**: If a migration fails, you may need to:
  1. Manually fix the database schema
  2. Delete the failed migration entry from `_prisma_migrations` table
  3. Run `prisma migrate deploy` again
- **Schema Sync**: Ensure your production database schema matches your Prisma schema before deploying

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
│   ├── (auth)/                   # Authentication routes (login, password reset, etc.)
│   ├── (backend)/                 # Backend/admin routes (dashboard, users, properties, etc.)
│   ├── (frontend)/                # Frontend routes (homepage, properties, news, etc.)
│   └── layout.tsx                 # Root layout
├── features/
│   ├── frontend/                  # Frontend feature components (properties, news, contact, etc.)
│   └── backend/                   # Backend feature components (admin panel)
│       ├── profile/               # User profile management
│       ├── users/                 # User management
│       ├── proprietes/            # Property management
│       ├── news/                  # News management
│       ├── notifications/        # Notifications table (admin only)
│       ├── notifications-area/   # Notification dropdown components
│       ├── dashboard/            # Dashboard analytics components
│       └── settings/             # Application settings
├── components/
│   ├── auth/                     # Authentication components
│   ├── backend/                   # Backend layout components
│   ├── frontend/                  # Frontend layout components
│   ├── shared/                    # Shared reusable components (Modal, Table, etc.)
│   └── ui/                        # shadcn/ui components
├── server/
│   ├── actions/                   # Server actions (auth, properties, users, etc.)
│   ├── queries/                   # Database query functions
│   ├── auth/                      # Authentication utilities
│   ├── mail/                      # Email functionality
│   ├── prisma/                    # Prisma configuration and migrations
│   ├── schemas/                   # Zod validation schemas
│   └── utils/                     # Server utility functions
├── hooks/                          # Custom React hooks
├── lib/                            # Utility functions and constants
├── providers/                      # React context providers
├── types/                          # TypeScript type definitions
└── public/                         # Static assets
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
- Relations: `properties` (Property\[\]), `notifications` (Notification\[\])

### PropertyStatus

Enum values:

- `APPROVED` - Property is approved and visible on frontend
- `IN_REVIEW` - Property is pending approval (default for new properties)
- `REJECTED` - Property has been rejected
- `INACTIVE` - Property is inactive (not visible on frontend)
- `DELETED` - Property is deleted (owner's account was deleted, properties transferred to admin)

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
- `status` - Property status (APPROVED, IN_REVIEW, REJECTED, INACTIVE, DELETED) (default: IN_REVIEW)
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

### Notification

- `id` - Unique identifier
- `title` - Notification title
- `message` - Notification message content
- `isRead` - Read status (default: false)
- `userId` - Foreign key to User
- `link` - Optional link to related page (e.g., /proprietes-area/edit/{id})
- `createdAt` - Notification creation timestamp
- `readAt` - Timestamp when notification was read (optional)
- Relations: `user` (User)
- Indexes: `userId`, `userId + isRead`, `createdAt`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle (includes Prisma generate and migrate deploy)
- `npm run build:local` - Build production bundle without running migrations (for local testing)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run email:dev` - Start email template preview server

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

## Application Constants

Constants are defined in `lib/constants.ts`:

- `MASTER_ADMIN_EMAIL` - Master admin email address (properties are transferred to this admin when a user deletes their profile)
- `PROPERTY_STATUS_OPTIONS` - All property status filter options (includes "all", APPROVED, IN_REVIEW, REJECTED, INACTIVE, DELETED)
- `PROPERTY_TYPE_OPTIONS` - All property type filter options (includes "all", Apartment, House, Commercial)
- `PROMOTED_OPTIONS` - Promotion status filter options (includes "all", "true", "false")
- `USER_ROLE_OPTIONS` - User role options (ADMIN, AGENT)
- `USER_STATUS_OPTIONS` - User status options (active, inactive)

## Deployment

### Vercel (Recommended)

1.  Push your code to GitHub
2.  Import your project to Vercel
3.  Configure environment variables:
    - `DATABASE_URL` - Production database connection string
    - `PINATA_JWT` - Pinata JWT token for IPFS uploads
    - `PINATA_LOGO_GROUP_ID` - Pinata group ID for logos
    - `PINATA_NEWS_IMAGE_GROUP_ID` - Pinata group ID for news images
    - `PINATA_PROPERTY_IMAGE_GROUP_ID` - Pinata group ID for property images
    - `EMAIL_USER` - Email address for sending emails
    - `EMAIL_PASS` - Email password for SMTP
    - `NEXT_PUBLIC_SITE_URL` - Public site URL (optional)
4.  **Important**: Ensure production database schema is up to date:
    - Run `prisma migrate deploy` manually if needed
    - Or migrations will run automatically during build (via `npm run build`)
5.  Deploy

### Database Migration on Production

**Before deploying to production:**

1. Ensure your production database schema matches your Prisma schema
2. If migrations are out of sync:

   ```bash
   # Check migration status
   DATABASE_URL="your_production_url" npx prisma migrate status --schema=./server/prisma/schema.prisma

   # Deploy migrations
   DATABASE_URL="your_production_url" npx prisma migrate deploy --schema=./server/prisma/schema.prisma
   ```

3. If a migration failed:
   - Manually fix the database schema
   - Delete the failed migration entry from `_prisma_migrations` table
   - Run `prisma migrate deploy` again

### Other Platforms

The application can be deployed to any platform that supports Next.js:

1.  Set all required environment variables
2.  Run `npm run build` (this will generate Prisma Client and deploy migrations)
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
- Custom hooks for complex state logic (`usePropertyFilters`, `useDirtyFormModal`)
- Utility functions for parsing and transforming data (`parsePropertySearchParams`, `reverseGeocode`, `getPlatformName`)
- Zod schemas for runtime validation
- Shared components for cross-cutting concerns (MapDisplay, LogoWithSettings, WarningModal, TableRecordsCount)
- Helper functions for metadata generation and geocoding
- React `cache()` for request-level memoization (`getCurrentUserFromSession`, `getSettings`)
- Optimized prop passing from layouts to reduce duplicate queries

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
  - Five statuses: APPROVED, IN_REVIEW (default), REJECTED, INACTIVE, DELETED
  - Custom `PropertyStatusBadge` component with color-coded status display
  - Status can be changed in edit form (optional field in update schema)
  - Automatic `promoted` flag management: set to `false` when status is not `APPROVED`
- **User Deletion Handling**:
  - When admin deletes a user: all properties transferred to deleting admin, status set to DELETED
  - When user deletes own profile: all properties transferred to master admin (defined in `MASTER_ADMIN_EMAIL`), status set to DELETED
  - Master admin cannot delete their own profile
  - Hard delete: user is completely removed from database
  - Session cleanup: deleted users are automatically logged out
- **Backend Property Filtering**:
  - Status filter (all statuses including INACTIVE and DELETED)
  - Type filter (Apartment, House, Commercial)
  - Promotion filter (promoted/not promoted)
  - Owner filter (admin only, shows all users)
  - Dynamic filter options from `lib/constants.ts`
  - URL-based filter persistence
  - Unified `PropertyFilters` type for frontend and backend
- **Unsaved Changes Warning**:
  - `useDirtyFormNavigation` hook for page navigation warnings (PropertyForm)
  - `beforeunload` event handling for tab close/refresh
  - `popstate` event handling for browser back button
  - `WarningModal` component for custom warning dialogs
  - Prevents accidental data loss when navigating away with unsaved changes
  - Dirty state tracking:
    - Form input changes mark form as dirty
    - Map position changes (LocationCard) mark form as dirty
    - Image gallery changes (add, delete, reorder) mark form as dirty
    - Consolidated `markDirty` callback with `useCallback` optimization
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
