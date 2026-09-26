import type { Airport, Flight } from "../../types/flight.types";

export interface FlightSearchState {
  airports: Airport[];
  flights: Flight[];
  results: Flight[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export type FlightSearchAction =
  | {
      type: "LOAD_START";
    }
  | {
      type: "LOAD_SUCCESS";
      payload: {
        airports: Airport[];
        flights: Flight[];
      };
    }
  | {
      type: "LOAD_ERROR";
      payload: string;
    }
  | {
      type: "SEARCH_SUCCESS";
      payload: Flight[];
    };
