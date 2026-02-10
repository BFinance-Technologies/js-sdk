import type { ApiResponse, Id, MessageResponse } from "../../types";

export type BudgetCardId = Id;

export type IssueBudgetCardRequest = {
  typeId: string;
  budgetId: string;
  firstName: string;
  lastName: string;
  label?: string;
};

export type BudgetCardSensitive = {
  number: string;
  expire: string;
  cvc: string;
};

export type BudgetCard = {
  id: BudgetCardId;
  maskedCardNumber: string;
  currency: string;
  status: string;
  externalCardId: string;
  sensitive: BudgetCardSensitive;
};

export type IssueBudgetCardResponse = ApiResponse<BudgetCard>;

export type BudgetCardByIdResponse = ApiResponse<BudgetCard>;
export type SetBudgetCardPinRequest = { pin: string };
export type UpdateBudgetCardEmailRequest = { email: string };
export type UpdateBudgetCardPhoneRequest = { phone: string };

export type VelocityLimitType =
  | "DAY"
  | "WEEK"
  | "MONTH"
  | "LIFETIME"
  | (string & {});

export type SetVelocityLimitsRequest = {
  type: VelocityLimitType;
  amount: number;
};

export type BudgetCardSensitiveResponse = ApiResponse<{
  number: string;
  expire: string;
  cvc: string;
}>;

export type BudgetCardSimpleResponse = MessageResponse;
