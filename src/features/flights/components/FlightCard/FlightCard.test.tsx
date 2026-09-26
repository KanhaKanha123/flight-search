import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Airport, Flight } from "../../types/flight.types";

import { FlightCard } from "./FlightCard";

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

const flight: Flight = {
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
};

describe("FlightCard", () => {
  it("renders the departure and arrival times", () => {
    render(<FlightCard flight={flight} airports={airports} />);

    expect(screen.getByText("07:00")).toBeInTheDocument();
    expect(screen.getByText("09:15")).toBeInTheDocument();
  });

  it("renders the airport codes and names", () => {
    render(<FlightCard flight={flight} airports={airports} />);

    expect(screen.getByText("AMS")).toBeInTheDocument();
    expect(screen.getByText("Amsterdam (Schiphol)")).toBeInTheDocument();

    expect(screen.getByText("BCN")).toBeInTheDocument();
    expect(screen.getByText("Barcelona")).toBeInTheDocument();
  });

  it("renders the flight number", () => {
    render(<FlightCard flight={flight} airports={airports} />);

    expect(screen.getByText("Flight HV5131")).toBeInTheDocument();
  });

  it("renders the total price", () => {
    render(<FlightCard flight={flight} airports={airports} />);

    expect(screen.getByText("€81.55")).toBeInTheDocument();
  });

  it("renders a booking link with the correct deeplink", () => {
    render(<FlightCard flight={flight} airports={airports} />);

    const bookingLink = screen.getByRole("link", {
      name: /book flight hv5131/i,
    });

    expect(bookingLink).toHaveAttribute(
      "href",
      "https://example.com/book-flight",
    );

    expect(bookingLink).toHaveAttribute("target", "_blank");

    expect(bookingLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
