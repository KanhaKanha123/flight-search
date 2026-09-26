import { describe, expect, it } from "vitest";
import type { Airport, Flight } from "../../../types/flight.types";
import {
  flightSearchReducer,
  initialFlightSearchState,
} from "./FlightSearch.reducer";

const airports: Airport[] = [
  {
    ItemName: "BCN",
    AirportName: "Barcelona",
    Description: "Barcelona, Spain",
  },
];

const flights = [
  {
    id: "flight-1",
    destination: "BCN",
  },
] as Flight[];

describe("flightSearchReducer", () => {
  it("starts loading and clears an existing error", () => {
    const state = flightSearchReducer(
      {
        ...initialFlightSearchState,
        isLoading: false,
        error: "Previous error",
      },
      {
        type: "LOAD_START",
      },
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("stores airports and flights after loading succeeds", () => {
    const state = flightSearchReducer(initialFlightSearchState, {
      type: "LOAD_SUCCESS",
      payload: {
        airports,
        flights,
      },
    });

    expect(state.airports).toEqual(airports);
    expect(state.flights).toEqual(flights);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("stores the error when loading fails", () => {
    const state = flightSearchReducer(initialFlightSearchState, {
      type: "LOAD_ERROR",
      payload: "Unable to load flights",
    });

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Unable to load flights");
  });

  it("stores search results after a search", () => {
    const state = flightSearchReducer(initialFlightSearchState, {
      type: "SEARCH_SUCCESS",
      payload: flights,
    });

    expect(state.results).toEqual(flights);
    expect(state.hasSearched).toBe(true);
  });
});
