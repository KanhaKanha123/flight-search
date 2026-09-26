"use client";

import { useReducer } from "react";
import {
  flightSearchFormReducer,
  initialFlightSearchFormState,
} from "./reducer/FlightSearchForm.reducer";
import styles from "./FlightSearchForm.module.css";
import type { FlightSearchFormProps } from "./FlightSearchForm.types";

export function FlightSearchForm({
  origins,
  destinations,
  onSearch,
}: FlightSearchFormProps) {
  const [state, dispatch] = useReducer(
    flightSearchFormReducer,
    origins,
    (availableOrigins) => ({
      ...initialFlightSearchFormState,
      origin: availableOrigins.length === 1 ? availableOrigins[0].ItemName : "",
    }),
  );

  const { origin, destination, departureDate } = state;
  
  return (
    <form
      className={styles.form}
      aria-labelledby="flight-search-heading"
      onSubmit={(event) => {
        event.preventDefault();

        onSearch({
          origin,
          destination,
          departureDate,
        });
      }}
    >
      <h2 id="flight-search-heading" className={styles.heading}>
        Search for a flight
      </h2>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="origin">
            Origin
          </label>

          <select
            className={styles.select}
            id="origin"
            name="origin"
            value={origin}
            onChange={(event) =>
              dispatch({
                type: "SET_ORIGIN",
                payload: event.target.value,
              })
            }
            required
          >
            {origins.length > 1 && <option value="">Select origin</option>}

            {origins.map((airport) => (
              <option key={airport.ItemName} value={airport.ItemName}>
                {airport.AirportName} ({airport.ItemName})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="destination" className={styles.label}>
            Destination
          </label>

          <select
            className={styles.select}
            id="destination"
            name="destination"
            value={destination}
            onChange={(event) =>
              dispatch({
                type: "SET_DESTINATION",
                payload: event.target.value,
              })
            }
            required
          >
            <option value="">Select destination</option>

            {destinations.map((airport) => (
              <option key={airport.ItemName} value={airport.ItemName}>
                {airport.AirportName} ({airport.ItemName})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="departureDate" className={styles.label}>
            Departure date
          </label>

          <input
            className={styles.input}
            id="departureDate"
            name="departureDate"
            type="date"
            min="2022-11-10"
            max="2022-11-30"
            value={departureDate}
            onChange={(event) =>
              dispatch({
                type: "SET_DEPARTURE_DATE",
                payload: event.target.value,
              })
            }
            aria-describedby="departure-date-description"
            required
          />
          <p id="departure-date-description" className={styles.description}>
            Available dates: 10–30 November 2022.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.button} type="submit">
          Search flights
        </button>
      </div>
    </form>
  );
}
