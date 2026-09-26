import type { Airport, FlightSearchCriteria } from "../../types/flight.types";

export interface FlightSearchFormProps {
  origins: Airport[];
  destinations: Airport[];
  onSearch: (criteria: FlightSearchCriteria) => void;
}

export interface FlightSearchFormState {
  origin: string;
  destination: string;
  departureDate: string;
}

export type FlightSearchFormAction =
  | {
      type: "SET_ORIGIN";
      payload: string;
    }
  | {
      type: "SET_DESTINATION";
      payload: string;
    }
  | {
      type: "SET_DEPARTURE_DATE";
      payload: string;
    }
  | {
      type: "RESET";
    };
