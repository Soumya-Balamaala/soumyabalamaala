export interface BrowserLocation {
  city?: string;
  state?: string;
  country?: string;
}

let cachedLocation: Promise<BrowserLocation> | null = null;

function getCoords(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 5000,
      maximumAge: 10 * 60 * 1000,
    });
  });
}

async function resolveLocation(): Promise<BrowserLocation> {
  try {
    const { coords } = await getCoords();
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
    );
    if (!response.ok) return {};
    const data = await response.json();
    return {
      city: data.city || data.locality || undefined,
      state: data.principalSubdivision || undefined,
      country: data.countryCode || undefined,
    };
  } catch {
    return {};
  }
}

// Requests the browser's geolocation permission and reverse-geocodes it into
// city/state/country. Resolves to {} (never rejects) if permission is denied,
// unsupported, or the lookup fails, so callers can spread the result safely.
// Cached per page load — the permission prompt only fires once.
export function getBrowserLocation(): Promise<BrowserLocation> {
  if (!cachedLocation) {
    cachedLocation = resolveLocation();
  }
  return cachedLocation;
}
