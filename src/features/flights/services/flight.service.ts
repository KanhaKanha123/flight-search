import { apiGet } from "../../../shared/api/apiClient";

import type { AirportsResponse, FlightsResponse } from "../types/flight.types";

import { mapFlightOfferToFlight } from "../mappers/flight.mapper";

export async function getAirports() {
  const response = await apiGet<AirportsResponse>("/data/airports.json");

  return response.Airports;
}

export async function getFlights() {
  const response = await apiGet<FlightsResponse>("/data/flights-from-AMS.json");

  return response.flightOffer.map(mapFlightOfferToFlight);
}
