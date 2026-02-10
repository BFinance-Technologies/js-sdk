import { ApiResponse } from "../../types";

export type GetMccDescriptionRequest = { mcc?: string };

export type GetMccDescriptionResponse = ApiResponse<{
  code: string;
  description: string;
}>;

export type ValidateIbanRequest = { iban?: string };

export type ValidateIbanResponse = { valid: boolean };

export type GetBankBySwiftRequest = { swift?: string };

export type GetBankBySwiftResponse = ApiResponse<{
  name: string;
  country: string;
  address: string;
  swift: string;
}>;
