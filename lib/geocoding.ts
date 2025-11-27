/**
 * Format address from Nominatim address components
 */
function formatAddress(
  address:
    | {
        road?: string;
        house_number?: string;
        city?: string;
        town?: string;
        village?: string;
        postcode?: string;
        country?: string;
      }
    | null
    | undefined
): string | null {
  if (!address) return null;

  const parts: string[] = [];
  if (address.road) parts.push(address.road);
  if (address.house_number) parts.push(address.house_number);
  const city = address.city || address.town || address.village;
  if (city) parts.push(city);
  if (address.postcode) parts.push(address.postcode);
  if (address.country) parts.push(address.country);

  return parts.length > 0 ? parts.join(", ") : null;
}

/**
 * Reverse geocoding using Nominatim API
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`,
      {
        headers: {
          "User-Agent": "RealEstateApp/1.0", // User-Agent is required by Nominatim
          "Accept-Language": "en", // Request English (Latin) response
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return formatAddress(data.address) || data.display_name || null;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
}
