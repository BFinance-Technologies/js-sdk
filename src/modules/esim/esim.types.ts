import { ApiResponse, DateResponse, Id } from "../../types";

export type CountryCode = string;
export type RegionId = string;
export type PackageId = string;
export type EsimId = Id;

export type EsimCountry = {
  isoName: string;
  name: string;
  flagUrl?: string;
};

export type GetCountriesResponse = ApiResponse<{ countries: EsimCountry[] }>;

export type EsimRegion = {
  id: string;
  name: string;
};

export type GetRegionsResponse = ApiResponse<{ regions: EsimRegion[] }>;

export type PackageUnit = "MB" | "GB" | "min" | "days" | (string & {});

export type PackageQuota = {
  quantity: number;
  unit: PackageUnit;
};

export type PackageQuotaWithoutUnit = {
  quantity: number;
};

export type EsimPackageItem = {
  id: string;
  name: string;
  price: number;
  data: PackageQuota;
  voice: PackageQuota;
  sms: PackageQuotaWithoutUnit;
  validity: PackageQuota;
  unlimited: boolean;
};

export type GetPackagesParams = {
  inlimited?: "true" | "false";
  sortBy?: string;
  sortType?: "asc" | "desc";
  page?: number;
};

export type GetCountryPackagesResponse = ApiResponse<{
  packages: EsimPackageItem[];
  page: number;
  totalPages: number;
}>;

export type GetGlobalPackagesResponse = ApiResponse<{
  packages: EsimPackageItem[];
  page: number;
  totalPages: number;
}>;

export type GetRegionPackagesResponse = ApiResponse<{
  packages: EsimPackageItem[];
  page: number;
  totalPages: number;
}>;

export type MobileStandards = "2G" | "3G" | "4G" | "5G" | (string & {});

export type PackageCoverage = {
  name: string;
  flagUrl?: string;
  network: Array<{
    name: string;
    mobileStandards: MobileStandards[];
  }>;
};

export type GetPackageDetailsResponse = ApiResponse<{
  id: string;
  price: number;
  unlimited: boolean;
  data: PackageQuota;
  voice: PackageQuota;
  sms: PackageQuotaWithoutUnit;
  validity: PackageQuota;
  coverage: PackageCoverage[];
}>;

export type PurchasePackageRequest = {
  externalId?: string;
};

export type PurchasePackageResponse = ApiResponse<{ id: string }>;

export type GetEsimDetailsReponse = ApiResponse<{
  esim: {
    installation: {
      lpa: string;
      smdpAddress: string;
      iccid: string;
    };
    createdAt: DateResponse;
    status: string;
    usage: {
      data: {
        initial: PackageQuota;
        remaining: PackageQuota;
      };
    };
  };
  package: {
    id: string;
    unlimited: boolean;
    data: PackageQuota;
    voice: PackageQuota;
    sms: PackageQuotaWithoutUnit;
    validity: PackageQuota;
    coverage: PackageCoverage[];
  };
}>;
