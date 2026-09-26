import type {
  FlightSearchAction,
  FlightSearchState,
} from "../FlightSearch.types";

export const initialFlightSearchState: FlightSearchState = {
  airports: [],
  flights: [],
  results: [],
  isLoading: true,
  error: null,
  hasSearched: false,
};

export function flightSearchReducer(
  state: FlightSearchState,
  action: FlightSearchAction,
): FlightSearchState {
  switch (action.type) {
    case "LOAD_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOAD_SUCCESS":
      return {
        ...state,
        airports: action.payload.airports,
        flights: action.payload.flights,
        isLoading: false,
        error: null,
      };

    case "LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        results: action.payload,
        hasSearched: true,
      };

    default:
      return state;
  }
}
