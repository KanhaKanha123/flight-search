import type { Flight, FlightOffer } from "../types/flight.types";

export function mapFlightOfferToFlight(offer: FlightOffer): Flight {
  const { outboundFlight, pricingInfoSum, deeplink } = offer;

  return {
    id: outboundFlight.id,
    origin: outboundFlight.departureAirport.locationCode,
    destination: outboundFlight.arrivalAirport.locationCode,
    departureDateTime: outboundFlight.departureDateTime,
    arrivalDateTime: outboundFlight.arrivalDateTime,
    flightNumber: outboundFlight.flightNumber,
    airline: outboundFlight.marketingAirline.companyShortName,
    price: pricingInfoSum.totalPriceAllPassengers,
    currency: pricingInfoSum.currencyCode,
    bookingUrl: deeplink.href,
  };
}
