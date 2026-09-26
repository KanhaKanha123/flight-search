import { describe, expect, it } from "vitest";

import type { Airport } from "../../types/flight.types";
import { getAirportName } from "./airportName";

const airports: Airport[] = [
  {
    ItemName: "AMS",
    AirportName: "Amsterdam (Schiphol)",
    Description: "Amsterdam (Schiphol), Netherlands",
  },
];

describe("getAirportName", () => {
  it("returns the airport name for a known code", () => {
    expect(getAirportName("AMS", airports)).toBe("Amsterdam (Schiphol)");
  });

  it("falls back to the airport code when no airport is found", () => {
    expect(getAirportName("BCN", airports)).toBe("BCN");
  });
});
