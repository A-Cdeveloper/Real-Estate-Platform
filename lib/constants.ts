export const APP_NAME = "Real Estate Pro";
export const APP_DESCRIPTION =
  "Find your perfect property with Real Estate Pro. Browse listings, explore neighborhoods, and connect with expert agents.";

// SEO & Metadata
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://realestatepro.com";

export const COPYRIGHT = {
  text: "All Rights Reserved",
  year: new Date().getFullYear(),
  company: APP_NAME,
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
