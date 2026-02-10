import { BaseService } from "../baseService";
import { omitUndefined } from "../../utils/omitUndefined";
import type {
  GetPackagesParams,
  GetCountriesResponse,
  GetRegionsResponse,
  GetGlobalPackagesResponse,
  PurchasePackageRequest,
  PurchasePackageResponse,
  GetEsimDetailsReponse,
} from "./esim.types";
import { ENDPOINTS } from "../../constants";

export class EsimService extends BaseService {
  getCountries() {
    return this.get<GetCountriesResponse>(ENDPOINTS.esim.countries);
  }

  getRegions() {
    return this.get<GetRegionsResponse>(ENDPOINTS.esim.regions);
  }

  getCountryPackages(countryCode: string, params?: GetPackagesParams) {
    const queryParams = omitUndefined<GetPackagesParams>(params ?? {});
    return this.get<GetCountriesResponse, GetPackagesParams>(
      ENDPOINTS.esim.countryPackages(encodeURIComponent(countryCode)),
      queryParams,
    );
  }

  getGlobalPackages(params?: GetPackagesParams) {
    const queryParams = omitUndefined<GetPackagesParams>(params ?? {});
    return this.get<GetGlobalPackagesResponse, GetPackagesParams>(
      ENDPOINTS.esim.globalPackages,
      queryParams,
    );
  }

  getRegionalPackages(regionId: string, params?: GetPackagesParams) {
    const queryParams = omitUndefined<GetPackagesParams>(params ?? {});
    return this.get<GetRegionsResponse, GetPackagesParams>(
      ENDPOINTS.esim.regionalPackages(encodeURIComponent(regionId)),
      queryParams,
    );
  }

  getPackageDetails(packageId: string) {
    return this.get<GetEsimDetailsReponse>(
      ENDPOINTS.esim.packageDetails(encodeURIComponent(packageId)),
    );
  }

  purchasePackage(packageId: string, payload?: PurchasePackageRequest) {
    const body = omitUndefined<PurchasePackageRequest>(payload ?? {});

    return this.post<
      PurchasePackageRequest | undefined,
      PurchasePackageResponse
    >(ENDPOINTS.esim.purchase(encodeURIComponent(packageId)), body);
  }

  getDetails(esimId: string) {
    return this.get<GetEsimDetailsReponse>(
      ENDPOINTS.esim.details(encodeURIComponent(esimId)),
    );
  }
}
