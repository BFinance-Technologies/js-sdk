import { ApiResponse, Id } from "../../types";

export type VirtualAccountId = Id;

export type DepositInstructions = {
  currency: string;
  iban: string;
  bic: string;
  accountHolderName: string;
  bankName: string;
  bankAddress: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  beneficiaryName: string;
  beneficiaryAddress: string;
  paymentRails: string[];
  clabe: string;
  pixCode: string;
};

export type GetVirtualAccountsResponse = ApiResponse<
  {
    id: VirtualAccountId;
    status: string;
    depositInstructions: DepositInstructions;
  }[]
>;

export type GetVirtualAccountEligibility = ApiResponse<{
  eligibile: boolean;
  eligibileFor: string[];
}>;

export type CurrencyType = "usd" | "eur" | "mxn" | "brl" | (string & {});
export type DestinationCurrencyType =
  | "usdb"
  | "usdc"
  | "usdt"
  | "dai"
  | "pyusd"
  | (string & {});
export type DestinationChainType =
  | "arbitrum"
  | "avalanche_c_chain"
  | "base"
  | "ethereum"
  | "optimism"
  | "polygon"
  | "solana"
  | "stellar"
  | "tron"
  | (string & {});

export type CreateVirtualAccountRequest = {
  type: CurrencyType;
  destination: {
    currency: DestinationCurrencyType;
    chain: DestinationChainType;
    address: string;
  };
};

export type CreateVirtualAccountResponse = ApiResponse<{
  status: string;
  depositInstructions: DepositInstructions;
}>;
