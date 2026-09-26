import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Airport, Flight } from "../../types/flight.types";
import { FlightResults } from "./FlightResults";

const airports: Airport[] = [
  {
    ItemName: "AMS",
    AirportName: "Amsterdam (Schiphol)",
    Description: "Amsterdam (Schiphol), Netherlands",
  },
  {
    ItemName: "BCN",
    AirportName: "Barcelona",
    Description: "Barcelona, Spain",
  },
];

const createFlight = (overrides: Partial<Flight> = {}): Flight => ({
  id: "flight-1",
  departureDateTime: "2022-11-23T07:00:00",
  arrivalDateTime: "2022-11-23T09:15:00",
  origin: "AMS",
  destination: "BCN",
  airline: "HV",
  flightNumber: 5131,
  price: 81.55,
  currency: "EUR",
  bookingUrl: "https://example.com/book-flight",
  ...overrides,
});

describe("FlightResults", () => {
  it("shows only the empty state when there are no flights", () => {
    render(<FlightResults flights={[]} airports={airports} />);

    expect(
      screen.getByText("No flights found for your search."),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /available flights/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders the available flights heading when flights exist", () => {
    render(<FlightResults flights={[createFlight()]} airports={airports} />);

    expect(
      screen.getByRole("heading", {
        name: /available flights/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows the singular result count for one flight", () => {
    render(<FlightResults flights={[createFlight()]} airports={airports} />);

    expect(screen.getByText("1 flight found.")).toBeInTheDocument();
  });

  it("shows the plural result count for multiple flights", () => {
    const flights = [
      createFlight(),
      createFlight({
        id: "flight-2",
        flightNumber: 5133,
        departureDateTime: "2022-11-23T18:30:00",
        arrivalDateTime: "2022-11-23T20:45:00",
      }),
    ];

    render(<FlightResults flights={flights} airports={airports} />);

    expect(screen.getByText("2 flights found.")).toBeInTheDocument();
  });

  it("renders a card for every flight", () => {
    const flights = [
      createFlight(),
      createFlight({
        id: "flight-2",
        flightNumber: 5133,
      }),
    ];

    render(<FlightResults flights={flights} airports={airports} />);

    expect(screen.getByText("Flight HV5131")).toBeInTheDocument();
    expect(screen.getByText("Flight HV5133")).toBeInTheDocument();
  });
});
