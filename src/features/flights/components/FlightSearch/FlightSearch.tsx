"use client";

import { useEffect, useMemo, useReducer } from "react";
import { getAirports, getFlights } from "../../services/flight.service";
import type { FlightSearchCriteria } from "../../types/flight.types";
import {
  filterFlights,
  getAvailableOrigins,
  getAvailableDestinations,
} from "../../utils";
import { FlightSearchForm } from "../FlightSearchForm/FlightSearchForm";
import {
  flightSearchReducer,
  initialFlightSearchState,
} from "./reducer/FlightSearch.reducer";
import styles from "./FlightSearch.module.css";
import { FlightResults } from "../FlightResults/FlightResults";

export function FlightSearch() {
  const [state, dispatch] = useReducer(
    flightSearchReducer,
    initialFlightSearchState,
  );

  const { airports, flights, results, isLoading, error, hasSearched } = state;

  useEffect(() => {
    async function loadData() {
      dispatch({ type: "LOAD_START" });

      try {
        const [airportData, flightData] = await Promise.all([
          getAirports(),
          getFlights(),
        ]);

        dispatch({
          type: "LOAD_SUCCESS",
          payload: {
            airports: airportData,
            flights: flightData,
          },
        });
      } catch {
        dispatch({
          type: "LOAD_ERROR",
          payload:
            "We could not load the flight information. Please try again.",
        });
      }
    }

    void loadData();
  }, []);

  const origins = useMemo(
    () => getAvailableOrigins(airports, flights),
    [airports, flights],
  );

  const destinations = useMemo(
    () => getAvailableDestinations(airports, flights),
    [airports, flights],
  );

  function handleSearch(criteria: FlightSearchCriteria) {
    const matchingFlights = filterFlights(flights, criteria);

    dispatch({
      type: "SEARCH_SUCCESS",
      payload: matchingFlights,
    });
  }

  if (isLoading) {
    return (
      <div className={styles.status} role="status" aria-live="polite">
        Loading flight information…
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className={styles.search} aria-label="Flight search">
      <FlightSearchForm
        origins={origins}
        destinations={destinations}
        onSearch={handleSearch}
      />

      {hasSearched && <FlightResults flights={results} airports={airports} />}
    </section>
  );
}
