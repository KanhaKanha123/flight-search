import type { Flight, FlightSearchCriteria } from "../../types/flight.types";

export function filterFlights(
  flights: Flight[],
  criteria: FlightSearchCriteria,
): Flight[] {
  const { origin, destination, departureDate } = criteria;

  return flights.filter((flight) => {
    const {
      origin: flightOrigin,
      destination: flightDestination,
      departureDateTime,
    } = flight;

    const flightDepartureDate = getDatePart(departureDateTime);

    return (
      flightOrigin === origin &&
      flightDestination === destination &&
      flightDepartureDate === departureDate
    );
  });
}

export function getDatePart(dateTime: string): string {
  return dateTime.slice(0, 10);
}
