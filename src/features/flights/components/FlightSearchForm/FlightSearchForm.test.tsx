import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Airport } from "../../types/flight.types";
import { FlightSearchForm } from "./FlightSearchForm";

const origins: Airport[] = [
  {
    ItemName: "AMS",
    AirportName: "Amsterdam",
    Description: "Amsterdam, Netherlands",
  },
];

const destinations: Airport[] = [
  {
    ItemName: "BCN",
    AirportName: "Barcelona",
    Description: "Barcelona, Spain",
  },
  {
    ItemName: "LCA",
    AirportName: "Cyprus (Larnaca)",
    Description: "Cyprus (Larnaca)",
  },
];

describe("FlightSearchForm", () => {
  it("renders the origin, destination and departure date fields", () => {
    render(
      <FlightSearchForm
        origins={origins}
        destinations={destinations}
        onSearch={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/origin/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/departure date/i)).toBeInTheDocument();
  });

  it("renders the available origins", () => {
    render(
      <FlightSearchForm
        origins={origins}
        destinations={destinations}
        onSearch={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("option", {
        name: /amsterdam.*ams/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the available destinations", () => {
    render(
      <FlightSearchForm
        origins={origins}
        destinations={destinations}
        onSearch={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("option", {
        name: /barcelona.*bcn/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: /cyprus.*lca/i,
      }),
    ).toBeInTheDocument();
  });

  it("submits the selected search criteria", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <FlightSearchForm
        origins={origins}
        destinations={destinations}
        onSearch={onSearch}
      />,
    );

    await user.selectOptions(screen.getByLabelText(/destination/i), "BCN");

    await user.type(screen.getByLabelText(/departure date/i), "2022-11-23");

    await user.click(
      screen.getByRole("button", {
        name: /search flights/i,
      }),
    );

    expect(onSearch).toHaveBeenCalledTimes(1);

    expect(onSearch).toHaveBeenCalledWith({
      origin: "AMS",
      destination: "BCN",
      departureDate: "2022-11-23",
    });
  });
});
