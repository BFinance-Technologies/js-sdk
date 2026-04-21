import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  GetVirtualAccountsResponse,
  GetVirtualAccountEligibility,
  CreateVirtualAccountRequest,
  CreateVirtualAccountResponse,
  SupportedCurrenciesReponse,
  ListVirtualAccountsResponse,
  GetVirtualAccountActivityParams,
  GetVirtualAccountActivityResponse,
  CloseVirtualAccountResponse,
} from "./virtualAccounts.types";

export class VirtualAccountsService extends BaseService {
  getList() {
    return this.get<ListVirtualAccountsResponse>(
      ENDPOINTS.virtualAccounts.list,
    );
  }

  getSupportedCurrencies() {
    return this.get<SupportedCurrenciesReponse>(
      ENDPOINTS.virtualAccounts.getSupportedCurrencies,
    );
  }

  create(customerId: string, payload: CreateVirtualAccountRequest) {
    return this.post<CreateVirtualAccountRequest, CreateVirtualAccountResponse>(
      ENDPOINTS.virtualAccounts.create(encodeURIComponent(customerId)),
      payload,
    );
  }

  getEligibility(customerId: string) {
    return this.get<GetVirtualAccountEligibility>(
      ENDPOINTS.virtualAccounts.eligibility(encodeURIComponent(customerId)),
    );
  }

  getAccounts(customerId: string) {
    return this.get<GetVirtualAccountsResponse>(
      ENDPOINTS.virtualAccounts.getVirtualAccounts(
        encodeURIComponent(customerId),
      ),
    );
  }

  getActivity(
    customerId: string,
    virtualAccountId: string,
    params: GetVirtualAccountActivityParams,
  ) {
    return this.get<
      GetVirtualAccountActivityResponse,
      GetVirtualAccountActivityParams
    >(
      ENDPOINTS.virtualAccounts.getVirtualAccountActivity(
        encodeURIComponent(customerId),
        encodeURIComponent(virtualAccountId),
      ),
      params,
    );
  }

  close(customerId: string, virtualAccountId: string) {
    return this.post<CloseVirtualAccountResponse>(
      ENDPOINTS.virtualAccounts.close(
        encodeURIComponent(customerId),
        encodeURIComponent(virtualAccountId),
      ),
    );
  }
}
