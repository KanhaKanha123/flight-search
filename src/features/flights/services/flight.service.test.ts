import { afterEach, describe, expect, it, vi } from "vitest";
import { getAirports, getFlights } from "./flight.service";

describe("flightService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getAirports", () => {
    it("returns airports when loading succeeds", async () => {
      const responseData = {
        Airports: [
          {
            ItemName: "AMS",
            AirportName: "Amsterdam (Schiphol)",
            Description: "Amsterdam (Schiphol), Netherlands",
          },
        ],
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(responseData), {
          status: 200,
        }),
      );

      const result = await getAirports();

      expect(fetch).toHaveBeenCalledWith("/data/airports.json");
      expect(result).toEqual(responseData.Airports);
    });

    it("throws an error when loading airports fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 500 }),
      );

      await expect(getAirports()).rejects.toThrow("Failed to load airports");
    });
  });

  describe("getFlights", () => {
    it("returns mapped flights when loading succeeds", async () => {
      const responseData = {
        resultSet: {
          count: 1,
        },
        flightOffer: [
          {
            outboundFlight: {
              id: "AMSBCN20221110HV5131",
              departureDateTime: "2022-11-10T07:00:00",
              arrivalDateTime: "2022-11-10T09:15:00",
              marketingAirline: {
                companyShortName: "HV",
              },
              flightNumber: 5131,
              departureAirport: {
                locationCode: "AMS",
              },
              arrivalAirport: {
                locationCode: "BCN",
              },
            },
            pricingInfoSum: {
              totalPriceAllPassengers: 193.55,
              totalPriceOnePassenger: 193.55,
              baseFare: 156.51,
              taxSurcharge: 37.04,
              currencyCode: "EUR",
              productClass: "Basic",
            },
            deeplink: {
              href: "https://example.com/booking",
            },
          },
        ],
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(JSON.stringify(responseData), {
          status: 200,
        }),
      );

      const result = await getFlights();

      expect(fetch).toHaveBeenCalledWith("/data/flights-from-AMS.json");

      expect(result).toHaveLength(1);

      expect(result[0]).toMatchObject({
        id: "AMSBCN20221110HV5131",
        origin: "AMS",
        destination: "BCN",
        flightNumber: 5131,
        airline: "HV",
        price: 193.55,
        currency: "EUR",
      });
    });

    it("throws an error when loading flights fails", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(null, { status: 500 }),
      );

      await expect(getFlights()).rejects.toThrow("Failed to load flights");
    });
  });
});
