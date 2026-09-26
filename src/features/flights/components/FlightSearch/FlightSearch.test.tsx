import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAirports, getFlights } from "../../services/flight.service";
import { FlightSearch } from "./FlightSearch";

vi.mock("../../services/flight.service", () => ({
  getAirports: vi.fn(),
  getFlights: vi.fn(),
}));

const mockedGetAirports = vi.mocked(getAirports);
const mockedGetFlights = vi.mocked(getFlights);

const airports = [
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

const flights = [
  {
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
  },
];

describe("FlightSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedGetAirports.mockResolvedValue(airports);
    mockedGetFlights.mockResolvedValue(flights);
  });

  it("shows a loading state while flight data is loading", () => {
    mockedGetAirports.mockReturnValue(new Promise(() => {}));
    mockedGetFlights.mockReturnValue(new Promise(() => {}));

    render(<FlightSearch />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /loading flight information/i,
    );
  });

  it("renders the search form after data loads", async () => {
    render(<FlightSearch />);

    expect(
      await screen.findByRole("heading", {
        name: /search for a flight/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: /barcelona.*bcn/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows an accessible error when loading fails", async () => {
    mockedGetFlights.mockRejectedValue(new Error("Network error"));

    render(<FlightSearch />);

    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContent(
      /we could not load the flight information/i,
    );
  });

  it("removes the loading state after data loads", async () => {
    render(<FlightSearch />);

    await screen.findByRole("heading", {
      name: /search for a flight/i,
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/loading flight information/i),
      ).not.toBeInTheDocument();
    });
  });
});
