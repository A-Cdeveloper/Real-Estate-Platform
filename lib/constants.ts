// User Role Options (using Prisma Role enum)
import { PropertyStatus, PropertyType, Role } from "@prisma/client";

// Master Admin Email - properties are transferred to this admin when user deletes their profile
export const MASTER_ADMIN_EMAIL = "aleksandar@e-seo.info";

// SEO & Metadata
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://realestatepro.com";

export const COPYRIGHT = {
  text: "All Rights Reserved",
  year: new Date().getFullYear(),
};

export const ITEMS_PER_PAGE = 12;
export const NEWS_PER_PAGE = 8;
export const LATEST_NEWS_COUNT = 5;
export const LATEST_PROPERTIES_COUNT = 9;
export const PROMOTED_PROPERTIES_COUNT = 9;
export const CAROUSEL_MIN_ITEMS_COUNT = 3;

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/proprietes", label: "Proprietes" },
  { href: "/contact", label: "Contact" },
] as const;

export const USER_ROLE_OPTIONS = [
  { value: Role.ADMIN, label: "Admin" },
  { value: Role.AGENT, label: "Agent" },
];

// User Status Options
export const USER_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// Logo upload validation constants
export const LOGO_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const LOGO_ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/webp",
] as const;

// News image upload validation constants
export const NEWS_IMAGE_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const NEWS_IMAGE_ALLOWED_TYPES = [...LOGO_ALLOWED_TYPES] as const;

// Default images
export const DEFAULT_NEWS_IMAGE = "/default-news.jpg";

// Property image upload validation constants
export const PROPERTY_IMAGE_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const PROPERTY_IMAGE_MAX_FILES = 10; // Maximum number of files per upload
export const PROPERTY_IMAGE_ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/webp",
] as const;

// Filters options
export const PROPERTY_STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: PropertyStatus.APPROVED, label: "Approved" },
  { value: PropertyStatus.IN_REVIEW, label: "In Review" },
  { value: PropertyStatus.REJECTED, label: "Rejected" },
  { value: PropertyStatus.INACTIVE, label: "Inactive" },
  { value: PropertyStatus.DELETED, label: "Deleted" },
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: PropertyType.Apartment, label: "Apartment" },
  { value: PropertyType.House, label: "House" },
  { value: PropertyType.Commercial, label: "Commercial" },
] as const;

export const PROMOTED_OPTIONS = [
  { value: "all", label: "All" },
  { value: "true", label: "Promoted" },
  { value: "false", label: "Not Promoted" },
] as const;
