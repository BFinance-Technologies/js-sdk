import { ApiResponse } from "../../types";

export type DepositNetwork =
  | "ethereum"
  | "tron"
  | "solana"
  | "polygon"
  | "ton"
  | "bnb";

export type DepositCurrency = "usdc" | "usdt";

export type GetCryptoDepositAddressParams = {
  network: DepositNetwork;
  currency: DepositCurrency;
};

export type GetCryptoDepositAddressResponse = ApiResponse<{
  address: string;
  network: DepositNetwork;
  currency: DepositCurrency;
}>;
