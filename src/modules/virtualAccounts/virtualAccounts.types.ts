import { ApiResponse, Id } from "../../types";

export type VirtualAccountId = Id;

export type DepositInstructions = {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
};

export type ListVirtualAccountsResponse = ApiResponse<
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

export type SupportedCurrenciesReponse = ApiResponse<{
  currencies: {
    currency: string;
    country: string;
    rails: string[];
  }[];
}>;

export type VirtualAccountDepositInstructions = {
  currency: string;
  iban: string | null;
  bic: string | null;
  accountHolderName: string | null;
  bankName: string | null;
  bankAddress: string | null;
  bankRoutingNumber: string | null;
  bankAccountNumber: string | null;
  beneficiaryName: string | null;
  beneficiaryAddress: string | null;
  paymentRails: string[] | null;
  clabe: string | null;
  pixCode: string | null;
};

export type GetVirtualAccountsResponse = ApiResponse<{
  id: string;
  status: string;
  depositInstructions: VirtualAccountDepositInstructions;
}>;

export type GetVirtualAccountActivityParams = {
  limit?: number;
};

export type GetVirtualAccountActivitySource = {
  rail: string | null;
  scheme: string | null;
  senderName: string | null;
  reference: string | null;
  uetr: string | null;
  description: string | null;
  trackingNumber: string | null;
  bic: string | null;
  iban: string | null;
  traceNumber: string | null;
  estimatedArrivalDate: string | null;
  senderRoutingNumber: string | null;
  bankRoutingNumber: string | null;
  bankName: string | null;
  originatorName: string | null;
  originatorAddress: string | null;
  imad: string | null;
  wireMessage: string | null;
  accountNumber: string | null;
  sortCode: string | null;
  clabe: string | null;
};

export type GetVirtualAccountActivityReceipt = {
  source: {
    amount: number | null;
    currency: string;
  };
  exchangeRate: number | null;
  fee: number | null;
  destination: {
    amount: number | null;
    currency: number | null;
    txHash: number | null;
  };
};

export type GetVirtualAccountActivityResponse = ApiResponse<{
  id: string;
  type: string;
  source: GetVirtualAccountActivitySource;
  receipt: GetVirtualAccountActivityReceipt;
}>;

export type CloseVirtualAccountResponse = ApiResponse<{}>;
