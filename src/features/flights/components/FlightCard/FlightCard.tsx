import { formatFlightTime, getAirportName } from "../../utils";
import type { FlightCardProps } from "../../types/flight.types";
import styles from "./FlightCard.module.css";

export function FlightCard({ flight, airports }: FlightCardProps) {
  const {
    id,
    departureDateTime,
    arrivalDateTime,
    origin,
    destination,
    airline,
    flightNumber,
    price,
    currency,
    bookingUrl,
  } = flight;

  const departureAirportName = getAirportName(origin, airports);

  const arrivalAirportName = getAirportName(destination, airports);

  const formattedPrice = new Intl.NumberFormat("en-NL", {
    style: "currency",
    currency: currency,
  }).format(price);

  return (
    <article className={styles.card} aria-labelledby={`flight-${flight.id}`}>
      <div className={styles.journey}>
        <div className={styles.airport}>
          <time className={styles.time} dateTime={departureDateTime}>
            {formatFlightTime(departureDateTime)}
          </time>

          <strong className={styles.code}>{origin}</strong>

          <span className={styles.airportName}>{departureAirportName}</span>
        </div>

        <div className={styles.route} aria-hidden="true">
          <span className={styles.routeLine} />
          <span className={styles.routeArrow}>→</span>
        </div>

        <div className={styles.airport}>
          <time className={styles.time} dateTime={arrivalDateTime}>
            {formatFlightTime(arrivalDateTime)}
          </time>

          <strong className={styles.code}>{destination}</strong>

          <span className={styles.airportName}>{arrivalAirportName}</span>
        </div>
      </div>

      <div className={styles.booking}>
        <p id={`flight-${id}`} className={styles.flightNumber}>
          Flight {airline}
          {flightNumber}
        </p>

        <div className={styles.priceGroup}>
          <span className={styles.priceLabel}>Total price</span>

          <strong className={styles.price}>{formattedPrice}</strong>
        </div>

        <a
          className={styles.bookButton}
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book flight ${flight.airline}${flight.flightNumber} from ${departureAirportName} to ${arrivalAirportName}`}
        >
          Book flight
        </a>
      </div>
    </article>
  );
}
