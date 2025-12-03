// User Role Options (using Prisma Role enum)
import { Role } from "@prisma/client";

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
