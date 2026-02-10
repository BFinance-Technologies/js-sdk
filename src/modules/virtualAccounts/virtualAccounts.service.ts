import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  GetVirtualAccountsResponse,
  GetVirtualAccountEligibility,
  CreateVirtualAccountRequest,
  CreateVirtualAccountResponse,
} from "./virtualAccounts.types";

export class VirtualAccountsService extends BaseService {
  getList(customerId: string) {
    return this.get<GetVirtualAccountsResponse>(
      ENDPOINTS.virtualAccounts.list(encodeURIComponent(customerId)),
    );
  }

  getEligibility(customerId: string) {
    return this.get<GetVirtualAccountEligibility>(
      ENDPOINTS.virtualAccounts.eligibility(encodeURIComponent(customerId)),
    );
  }

  create(customerId: string, payload: CreateVirtualAccountRequest) {
    return this.post<CreateVirtualAccountRequest, CreateVirtualAccountResponse>(
      ENDPOINTS.virtualAccounts.create(encodeURIComponent(customerId)),
      payload,
    );
  }
}
