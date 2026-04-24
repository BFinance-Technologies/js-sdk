import { ENDPOINTS } from "../../constants";
import { omitUndefined } from "../../utils/omitUndefined";
import { BaseService } from "../baseService";
import type {
  GetMccDescriptionResponse,
  ValidateIbanResponse,
  GetBankBySwiftResponse,
  GetMccDescriptionRequest,
  ValidateIbanRequest,
  GetBankBySwiftRequest,
  SearchAirportsParams,
  SearchAirportsResponse,
  SearchNearbyAirportsParams,
  SearchNearbyAirportsResponse,
  FlightInfoParams,
  FlightDataResponse,
} from "./utils.types";

export class UtilsService extends BaseService {
  getMccDescription(payload?: GetMccDescriptionRequest) {
    const body = payload ?? {};
    return this.post<GetMccDescriptionRequest, GetMccDescriptionResponse>(
      ENDPOINTS.utils.mcc,
      body,
    );
  }

  validateIban(payload?: ValidateIbanRequest) {
    const body = payload ?? {};
    return this.post<ValidateIbanRequest, ValidateIbanResponse>(
      ENDPOINTS.utils.validateIban,
      body,
    );
  }

  getBankBySwift(payload?: GetBankBySwiftRequest) {
    const body = payload ?? {};
    return this.post<GetBankBySwiftRequest, GetBankBySwiftResponse>(
      ENDPOINTS.utils.bankBySwift,
      body,
    );
  }

  searchAirports(params: SearchAirportsParams) {
    return this.get<SearchAirportsResponse, SearchAirportsParams>(
      ENDPOINTS.utils.searchAirports,
      params,
    );
  }

  findNearbyAirports(params: SearchNearbyAirportsParams) {
    return this.get<SearchNearbyAirportsResponse, SearchNearbyAirportsParams>(
      ENDPOINTS.utils.searchNearbyAirports,
      params,
    );
  }

  flightInfo(params: FlightInfoParams) {
    return this.get<FlightDataResponse, FlightInfoParams>(
      ENDPOINTS.utils.flightInfo,
      params,
    );
  }
}
