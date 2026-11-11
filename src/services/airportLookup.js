
let airportsCache = null;

export const loadAirports = async () => {
  if (airportsCache) return airportsCache;

  const response = await fetch("/airports.json");

  if (!response.ok) {
    throw new Error("Failed to load airport data");
  }

  airportsCache = await response.json();

  return airportsCache;
};

export const searchAirports = (airports, term) => {
  const query = term.trim().toLowerCase();

  if (!query) return [];

  return airports
    .filter(
      (airport) =>
        airport.code.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query)
    )
    .slice(0, 5);
};
