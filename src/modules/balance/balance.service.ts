import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type { GetUserBalanceResponse } from "./balance.types";

export class BalanceService extends BaseService {
  getUserBalance() {
    return this.get<GetUserBalanceResponse>(ENDPOINTS.balance.get);
  }
}
