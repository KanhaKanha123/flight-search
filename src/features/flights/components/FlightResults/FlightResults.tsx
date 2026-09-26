import { FlightCard } from "../FlightCard/FlightCard";
import type { FlightResultsProps } from "../../types/flight.types";
import styles from "./FlightResults.module.css";

export function FlightResults({ flights, airports }: FlightResultsProps) {
  if (flights.length === 0) {
    return (
      <div
        className={styles.emptyState}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        No flights found for your search.
      </div>
    );
  }

  const resultMessage = `${flights.length} ${
    flights.length === 1 ? "flight" : "flights"
  } found.`;

  return (
    <section
      className={styles.results}
      aria-labelledby="flight-results-heading"
    >
      <div className={styles.header}>
        <h2 id="flight-results-heading" className={styles.heading}>
          Available flights
        </h2>

        <p
          className={styles.resultCount}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {resultMessage}
        </p>
      </div>

      <div className={styles.list}>
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} airports={airports} />
        ))}
      </div>
    </section>
  );
}
