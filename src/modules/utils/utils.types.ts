import { ApiResponse } from "../../types";

export type GetMccDescriptionRequest = { mcc?: string };

export type GetMccDescriptionResponse = ApiResponse<{
  code: string;
  description: string;
}>;

export type ValidateIbanRequest = { iban?: string };

export type ValidateIbanResponse = ApiResponse<{ valid: boolean }>;

export type GetBankBySwiftRequest = { swift?: string };

export type GetBankBySwiftResponse = ApiResponse<{
  name: string;
  country: string;
  address: string;
  swift: string;
}>;

export type SearchAirportsParams = {
  query: string;
};

export type AirportsResponse = {
  name: string;
  city: string;
  country: string;
  codes: {
    iata: string;
    icao: string;
  };
};

export type SearchAirportsResponse = ApiResponse<{
  results: AirportsResponse[];
}>;

export type SearchNearbyAirportsParams = {
  latitude: string;
  longitude: string;
};

export type SearchNearbyAirportsResponse = ApiResponse<{
  results: (AirportsResponse & {
    distance: { value: number; unit: string };
    relevance: number;
  })[];
}>;

export type FlightInfoParams = {
  flightNumber: string;
  date: string;
};

export type FlightType = "scheduled-passenger-normal-service" | (string & {});

export type EquipmentDetails = {
  turboProp: boolean;
  jet: boolean;
  widebody: boolean;
  regional: boolean;
};

export type Equipment = {
  iata: string;
  name: string;
  details: EquipmentDetails;
};

export type FlightEquipment = {
  tailNumber: string | null;
  actualIataCode: string | null;
  scheduledIataCode: string | null;
  equipments: Equipment[];
};

export type Airline = {
  iataCode: string;
  icaoCode: string;
  businessName: string;
  commonName: string | null;
  logoUrl: string;
};

export type Codeshare = {
  fsCode: string;
  flightNumber: string;
  relationship: string;
};

export type Departure = {
  iataCode: string;
  timestamp: string;
  terminal: string | null;
  departureGate: string | null;
};

export type Arrival = {
  iataCode: string;
  timestamp: string;
  terminal: string | null;
  arrivalGate: string | null;
  baggageClaim: string | null;
};

export type FlightDataResponse = ApiResponse<{
  status: string;
  number: string;
  date: string;
  flightType: FlightType;
  departure: Departure;
  arrival: Arrival;
  duration: number;
  airline: Airline;
  flightEquipment: FlightEquipment;
  codeshares: Codeshare[];
}>;
