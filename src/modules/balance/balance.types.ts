import { ApiResponse } from "../../types";

export type GetUserBalanceResponse = ApiResponse<{
  /** @deprecated will be removed in the near future */
  balance?: string;
  eur: number;
  usd: number;
}>;
