import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  GetCryptoDepositAddressParams,
  GetCryptoDepositAddressResponse,
} from "./finance.types";

export class FinanceService extends BaseService {
  getCryptoDepositAddress(params: GetCryptoDepositAddressParams) {
    return this.get<GetCryptoDepositAddressResponse, GetCryptoDepositAddressParams>(
      ENDPOINTS.finance.deposit,
      params,
    );
  }
}
