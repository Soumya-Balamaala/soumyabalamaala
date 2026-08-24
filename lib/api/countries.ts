import { getJson } from './shared';

export interface Country {
  country: string;
  iso2: string;
  phonecode: string;
  phone_number_format?: string;
  flag?: string;
}

export async function fetchCountries(): Promise<Country[]> {
  const result = await getJson<{ data: Country[] }>('/api/public/countries');
  return Array.isArray(result?.data) ? result.data : [];
}
