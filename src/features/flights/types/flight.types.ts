export interface Airport {
  ItemName: string;
  AirportName: string;
  Description: string;
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  flightNumber: number;
  airline: string;
  price: number;
  currency: string;
  bookingUrl: string;
}

export interface AirportsResponse {
  Airports: Airport[];
}

export interface AirportCode {
  locationCode: string;
}

export interface MarketingAirline {
  companyShortName: string;
}

export interface OutboundFlight {
  id: string;
  departureDateTime: string;
  arrivalDateTime: string;
  marketingAirline: MarketingAirline;
  flightNumber: number;
  departureAirport: AirportCode;
  arrivalAirport: AirportCode;
}

export interface PricingInfo {
  totalPriceAllPassengers: number;
  totalPriceOnePassenger: number;
  baseFare: number;
  taxSurcharge: number;
  currencyCode: string;
  productClass: string;
}

export interface Deeplink {
  href: string;
}

export interface FlightOffer {
  outboundFlight: OutboundFlight;
  pricingInfoSum: PricingInfo;
  deeplink: Deeplink;
}

export interface FlightsResponse {
  resultSet: {
    count: number;
  };
  flightOffer: FlightOffer[];
}

export interface FlightSearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
}

export interface FlightCardProps {
  flight: Flight;
  airports: Airport[];
}

export interface FlightResultsProps {
  flights: Flight[];
  airports: Airport[];
}
