import { describe, expect, it } from "vitest";

import type { Airport, Flight } from "../../types/flight.types";

import {
  getAvailableDestinations,
  getAvailableOrigins,
} from "./availableOriginsDestinations";

const airports: Airport[] = [
  {
    ItemName: "AMS",
    AirportName: "Amsterdam Schiphol",
    Description: "Amsterdam, Netherlands",
  },
  {
    ItemName: "BCN",
    AirportName: "Barcelona",
    Description: "Barcelona, Spain",
  },
  {
    ItemName: "LCA",
    AirportName: "Larnaca",
    Description: "Larnaca, Cyprus",
  },
  {
    ItemName: "EIN",
    AirportName: "Eindhoven",
    Description: "Eindhoven, Netherlands",
  },
];

function createFlight(overrides: Partial<Flight> = {}): Flight {
  return {
    id: "flight-1",
    departureDateTime: "2022-11-20T08:00:00",
    arrivalDateTime: "2022-11-20T10:30:00",
    origin: "AMS",
    destination: "BCN",
    airline: "HV",
    flightNumber: 5131,
    price: 81.55,
    currency: "EUR",
    bookingUrl: "https://example.com/book",
    ...overrides,
  };
}

describe("getAvailableOrigins", () => {
  it("returns airports that are used as flight origins", () => {
    const flights = [
      createFlight({
        origin: "AMS",
      }),
      createFlight({
        id: "flight-2",
        origin: "EIN",
      }),
    ];

    const result = getAvailableOrigins(airports, flights);

    expect(result).toEqual([airports[0], airports[3]]);
  });

  it("returns each origin only once when multiple flights have the same origin", () => {
    const flights = [
      createFlight({
        id: "flight-1",
        origin: "AMS",
      }),
      createFlight({
        id: "flight-2",
        origin: "AMS",
      }),
      createFlight({
        id: "flight-3",
        origin: "AMS",
      }),
    ];

    const result = getAvailableOrigins(airports, flights);

    expect(result).toEqual([airports[0]]);
  });

  it("ignores origin codes that do not exist in the airports list", () => {
    const flights = [
      createFlight({
        origin: "UNKNOWN",
      }),
    ];

    const result = getAvailableOrigins(airports, flights);

    expect(result).toEqual([]);
  });

  it("returns an empty array when there are no flights", () => {
    const result = getAvailableOrigins(airports, []);

    expect(result).toEqual([]);
  });

  it("returns an empty array when there are no airports", () => {
    const flights = [createFlight()];

    const result = getAvailableOrigins([], flights);

    expect(result).toEqual([]);
  });
});

describe("getAvailableDestinations", () => {
  it("returns airports that are used as flight destinations", () => {
    const flights = [
      createFlight({
        destination: "BCN",
      }),
      createFlight({
        id: "flight-2",
        destination: "LCA",
      }),
    ];

    const result = getAvailableDestinations(airports, flights);

    expect(result).toEqual([airports[1], airports[2]]);
  });

  it("returns each destination only once when multiple flights have the same destination", () => {
    const flights = [
      createFlight({
        id: "flight-1",
        destination: "BCN",
      }),
      createFlight({
        id: "flight-2",
        destination: "BCN",
      }),
      createFlight({
        id: "flight-3",
        destination: "BCN",
      }),
    ];

    const result = getAvailableDestinations(airports, flights);

    expect(result).toEqual([airports[1]]);
  });

  it("ignores destination codes that do not exist in the airports list", () => {
    const flights = [
      createFlight({
        destination: "UNKNOWN",
      }),
    ];

    const result = getAvailableDestinations(airports, flights);

    expect(result).toEqual([]);
  });

  it("returns an empty array when there are no flights", () => {
    const result = getAvailableDestinations(airports, []);

    expect(result).toEqual([]);
  });

  it("returns an empty array when there are no airports", () => {
    const flights = [createFlight()];

    const result = getAvailableDestinations([], flights);

    expect(result).toEqual([]);
  });
});
