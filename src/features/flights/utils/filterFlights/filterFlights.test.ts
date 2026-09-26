import { describe, expect, it } from "vitest";
import type { Flight } from "../../types/flight.types";
import { filterFlights } from "./filterFlights";

const flights: Flight[] = [
  {
    id: "AMSBCN20221110HV5131",
    origin: "AMS",
    destination: "BCN",
    departureDateTime: "2022-11-10T07:00:00",
    arrivalDateTime: "2022-11-10T09:15:00",
    flightNumber: 5131,
    airline: "HV",
    price: 193.55,
    currency: "EUR",
    bookingUrl: "https://example.com/booking",
  },
  {
    id: "AMSALC20221110HV6143",
    origin: "AMS",
    destination: "ALC",
    departureDateTime: "2022-11-10T06:45:00",
    arrivalDateTime: "2022-11-10T09:25:00",
    flightNumber: 6143,
    airline: "HV",
    price: 50.7,
    currency: "EUR",
    bookingUrl: "https://example.com/booking",
  },
];

describe("filterFlights", () => {
  it("returns flights matching origin, destination and departure date", () => {
    const result = filterFlights(flights, {
      origin: "AMS",
      destination: "BCN",
      departureDate: "2022-11-10",
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("AMSBCN20221110HV5131");
  });

  it("returns an empty array when no flights match", () => {
    const result = filterFlights(flights, {
      origin: "AMS",
      destination: "FNC",
      departureDate: "2022-11-10",
    });

    expect(result).toEqual([]);
  });
});
