import type { Airport } from "../../types/flight.types";

export function getAirportName(code: string, airports: Airport[]): string {
  return (
    airports.find((airport) => airport.ItemName === code)?.AirportName ?? code
  );
}
