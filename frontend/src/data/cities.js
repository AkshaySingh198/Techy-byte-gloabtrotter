export const CITIES_DATABASE = [
  // India
  { city: 'Mumbai', country: 'India', code: 'BOM' },
  { city: 'Delhi', country: 'India', code: 'DEL' },
  { city: 'Bengaluru', country: 'India', code: 'BLR' },
  { city: 'Goa', country: 'India', code: 'GOI' },
  { city: 'Jaipur', country: 'India', code: 'JAI' },
  { city: 'Kolkata', country: 'India', code: 'CCU' },
  { city: 'Chennai', country: 'India', code: 'MAA' },
  { city: 'Hyderabad', country: 'India', code: 'HYD' },
  { city: 'Kochi', country: 'India', code: 'COK' },
  { city: 'Udaipur', country: 'India', code: 'UDR' },
  { city: 'Varanasi', country: 'India', code: 'VNS' },
  { city: 'Manali', country: 'India', code: 'KUU' },
  { city: 'Shimla', country: 'India', code: 'SLV' },
  { city: 'Agra', country: 'India', code: 'AGR' },
  { city: 'Srinagar', country: 'India', code: 'SXR' },
  { city: 'Amritsar', country: 'India', code: 'ATQ' },
  { city: 'Ahmedabad', country: 'India', code: 'AMD' },
  { city: 'Pune', country: 'India', code: 'PNQ' },

  // International Destinations
  { city: 'Kyoto', country: 'Japan', code: 'UKY' },
  { city: 'Tokyo', country: 'Japan', code: 'TYO' },
  { city: 'Santorini', country: 'Greece', code: 'JTR' },
  { city: 'Athens', country: 'Greece', code: 'ATH' },
  { city: 'Machu Picchu', country: 'Peru', code: 'CUZ' },
  { city: 'Lima', country: 'Peru', code: 'LIM' },
  { city: 'New York City', country: 'USA', code: 'NYC' },
  { city: 'Los Angeles', country: 'USA', code: 'LAX' },
  { city: 'San Francisco', country: 'USA', code: 'SFO' },
  { city: 'Miami', country: 'USA', code: 'MIA' },
  { city: 'Interlaken', country: 'Switzerland', code: 'ZRH' },
  { city: 'Zurich', country: 'Switzerland', code: 'ZRH' },
  { city: 'Geneva', country: 'Switzerland', code: 'GVA' },
  { city: 'Bali', country: 'Indonesia', code: 'DPS' },
  { city: 'Jakarta', country: 'Indonesia', code: 'CGK' },
  { city: 'London', country: 'United Kingdom', code: 'LON' },
  { city: 'Paris', country: 'France', code: 'PAR' },
  { city: 'Rome', country: 'Italy', code: 'ROM' },
  { city: 'Venice', country: 'Italy', code: 'VCE' },
  { city: 'Florence', country: 'Italy', code: 'FLR' },
  { city: 'Dubai', country: 'UAE', code: 'DXB' },
  { city: 'Abu Dhabi', country: 'UAE', code: 'AUH' },
  { city: 'Singapore', country: 'Singapore', code: 'SIN' },
  { city: 'Bangkok', country: 'Thailand', code: 'BKK' },
  { city: 'Phuket', country: 'Thailand', code: 'HKT' },
  { city: 'Barcelona', country: 'Spain', code: 'BCN' },
  { city: 'Madrid', country: 'Spain', code: 'MAD' },
  { city: 'Amsterdam', country: 'Netherlands', code: 'AMS' },
  { city: 'Berlin', country: 'Germany', code: 'BER' },
  { city: 'Munich', country: 'Germany', code: 'MUC' },
  { city: 'Vienna', country: 'Austria', code: 'VIE' },
  { city: 'Prague', country: 'Czech Republic', code: 'PRG' },
  { city: 'Maldives', country: 'Maldives', code: 'MLE' },
  { city: 'Sydney', country: 'Australia', code: 'SYD' },
  { city: 'Melbourne', country: 'Australia', code: 'MEL' },
  { city: 'Toronto', country: 'Canada', code: 'YYZ' },
  { city: 'Vancouver', country: 'Canada', code: 'YVR' },
  { city: 'Cairo', country: 'Egypt', code: 'CAI' },
  { city: 'Cape Town', country: 'South Africa', code: 'CPT' },
  { city: 'Seoul', country: 'South Korea', code: 'ICN' },
  { city: 'Istanbul', country: 'Turkey', code: 'IST' },
  { city: 'Rio de Janeiro', country: 'Brazil', code: 'GIG' },
  { city: 'Buenos Aires', country: 'Argentina', code: 'EZE' }
];

export function validateCity(query) {
  if (!query || query.trim().length < 2) return null;
  const clean = query.trim().toLowerCase();
  return CITIES_DATABASE.find(
    (c) =>
      c.city.toLowerCase() === clean ||
      `${c.city.toLowerCase()}, ${c.country.toLowerCase()}` === clean ||
      c.code.toLowerCase() === clean
  );
}

export function searchCities(query) {
  if (!query || query.trim().length < 1) return [];
  const clean = query.trim().toLowerCase();
  return CITIES_DATABASE.filter(
    (c) =>
      c.city.toLowerCase().includes(clean) ||
      c.country.toLowerCase().includes(clean) ||
      c.code.toLowerCase().includes(clean)
  ).slice(0, 4);
}
