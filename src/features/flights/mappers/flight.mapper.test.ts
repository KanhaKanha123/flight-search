import { describe, expect, it } from "vitest";
import type { FlightOffer } from "../types/flight.types";
import { mapFlightOfferToFlight } from "./flight.mapper";

describe("mapFlightOfferToFlight", () => {
  it("maps an API flight offer to the application flight model", () => {
    const offer: FlightOffer = {
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
    };

    const result = mapFlightOfferToFlight(offer);

    expect(result).toEqual({
      id: "AMSBCN20221110HV5131",
      origin: "AMS",
      destination: "BCN",
      departureDateTime: "2022-11-10T07:00:00",
      arrivalDateTime: "2022-11-10T09:15:00",
      flightNumber: 5131,
      airline: "HV",
      price: 193.55,
      currency: "EUR",
      bookingUrl: "https://example.com/booking",
    });
  });
});
