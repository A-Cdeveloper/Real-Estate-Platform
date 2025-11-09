export const APP_NAME = "Real Estate";
export const APP_DESCRIPTION =
  "Find your perfect property with Real Estate Pro. Browse listings, explore neighborhoods, and connect with expert agents.";

// Contact Information
export const CONTACT_ADDRESS =
  "Bulevar Mihajla Pupina 45, 11000 Beograd, Serbia";
export const CONTACT_PHONE = "+381 63 999999999";
export const CONTACT_EMAIL = "aleksandar@e-seo.info";

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
