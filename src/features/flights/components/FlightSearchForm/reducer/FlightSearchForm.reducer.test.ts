import { describe, expect, it } from "vitest";
import {
  flightSearchFormReducer,
  initialFlightSearchFormState,
} from "./FlightSearchForm.reducer";

describe("flightSearchFormReducer", () => {
  it("updates the destination", () => {
    const state = flightSearchFormReducer(initialFlightSearchFormState, {
      type: "SET_DESTINATION",
      payload: "BCN",
    });

    expect(state.destination).toBe("BCN");
  });

  it("updates the origin", () => {
    const state = flightSearchFormReducer(initialFlightSearchFormState, {
      type: "SET_ORIGIN",
      payload: "AMS",
    });

    expect(state.origin).toBe("AMS");
  });

  it("updates the departure date", () => {
    const state = flightSearchFormReducer(initialFlightSearchFormState, {
      type: "SET_DEPARTURE_DATE",
      payload: "2022-11-23",
    });

    expect(state.departureDate).toBe("2022-11-23");
  });

  it("resets the form", () => {
    const currentState = {
      origin: "AMS",
      destination: "BCN",
      departureDate: "2022-11-23",
    };

    const state = flightSearchFormReducer(currentState, {
      type: "RESET",
    });

    expect(state).toEqual(initialFlightSearchFormState);
  });
});
