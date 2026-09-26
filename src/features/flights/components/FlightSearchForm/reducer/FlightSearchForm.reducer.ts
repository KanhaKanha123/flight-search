import type {
  FlightSearchFormAction,
  FlightSearchFormState,
} from "../FlightSearchForm.types";

export const initialFlightSearchFormState: FlightSearchFormState = {
  origin: "",
  destination: "",
  departureDate: "",
};

export function flightSearchFormReducer(
  state: FlightSearchFormState,
  action: FlightSearchFormAction,
): FlightSearchFormState {
  switch (action.type) {
    case "SET_DESTINATION":
      return {
        ...state,
        destination: action.payload,
      };

    case "SET_ORIGIN":
      return {
        ...state,
        origin: action.payload,
      };

    case "SET_DEPARTURE_DATE":
      return {
        ...state,
        departureDate: action.payload,
      };

    case "RESET":
      return initialFlightSearchFormState;

    default:
      return state;
  }
}
