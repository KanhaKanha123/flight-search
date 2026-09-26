import type { Airport, Flight } from "../../types/flight.types";

export function getAvailableOrigins(
  airports: Airport[],
  flights: Flight[],
): Airport[] {
  const originCodes = flights.map((flight) => flight.origin);

  const uniqueOriginCodes = new Set(originCodes);

  return airports.filter((airport) => uniqueOriginCodes.has(airport.ItemName));
}

export function getAvailableDestinations(
  airports: Airport[],
  flights: Flight[],
): Airport[] {
  const destinationCodes = flights.map((flight) => flight.destination);
  const uniqueDestinationCodes = new Set(destinationCodes);

  return airports.filter((airport) =>
    uniqueDestinationCodes.has(airport.ItemName),
  );
}
