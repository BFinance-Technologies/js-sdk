import {
  ApiResponse,
  DateResponse,
  Id,
  MessageResponse,
  PaginationParams,
} from "../../types";

export type PrepaidCardId = Id;

export type PrepaidCardItem = {
  id: PrepaidCardId;
  maskedCardNumber: string;
  currency: string;
  status: string;
  externalCardId: string;
};

export type GetPrepaidCardsResponse = ApiResponse<{
  cards: PrepaidCardItem[];
  page: number;
  limit: number;
}>;

export type IssuePrepaidCardRequst = {
  typeId: string;
  initialBalance: number;
  firstName: string;
  lastName: string;
  label?: string;
};

export type IssuedPrepaidCard = {
  id: PrepaidCardId;
  cardNumber: string;
  cardExpire: string;
  cardCVC: string;
  cardBalance: number;
  currency: string;
  maskedCardNumber: string;
  brand: string;
  label: string;
};

export type IssuePrepaidCardResponse = ApiResponse<{
  card: IssuedPrepaidCard;
}>;

export type ReissuePrepaidCardRequest = {
  cardId: PrepaidCardId;
  initialBalance: number;
};

export type ReissuedPrepaidCard = {
  id: PrepaidCardId;
  cardExpire: string;
  cardBalance: number;
  currency: string;
  maskedCardNumber: string;
  brand: string;
  label: string;
};

export type ReissuePrepaidCardResponse = ApiResponse<{
  card: ReissuedPrepaidCard;
}>;

export type PrepaidCardBalance = {
  value: number;
  currency: string;
};

export type PrepaidCardSensitive = {
  number: string;
  expire: string;
  cvc: string;
};

export type GetPrepaidCardDetailsResponse = ApiResponse<{
  id: PrepaidCardId;
  maskedCardNumber: string;
  sensetive: PrepaidCardSensitive;
  currency: string;
  status: string;
  externalCardId: string;
  balance: PrepaidCardBalance;
}>;

export type CardTransaction = {
  id: string;
  amount: number;
  currency: string;
  usdAmount: number;
  merchant: string;
  status: string;
  type: string;
  date: DateResponse;
  transactionId: string;
  declineReason: string | null;
};

export type GetPrepaidCardTransactionsResponse = ApiResponse<{
  transactions: CardTransaction[];
}>;

export type GetPrepaidCardSensitiveResponse = ApiResponse<{
  number: string;
  expire: string;
  cvc: string;
}>;

export type UpdateEmailRequest = { email: string };
export type UpdatePhoneRequest = { phone: string };
export type TopUpRequest = { amount: number };
export type SetPinRequest = { pin: string };
export type WithdrawFundsRequest = { amount: number };
export type ApproveTransactionRequest = { actionId: string };

export type GenerateTopUpAddressParams = {
  currency: string;
  network: string;
};

export type GenerateTopUpAddressAmount = {
  min: number;
  max: number;
  fee: number;
};

export type GenerateTopUpAddressResponse = ApiResponse<{
  address: string;
  network: string;
  currency: string;
  qrImage: string;
  amount: GenerateTopUpAddressAmount;
}>;

export type GetSpendingLimitsItem = {
  limit: number;
  used: number;
};

export type GetSpendingLimitsItemWithoutUsed = {
  limit: number;
};

export type GetSpendingLimitsResponse = ApiResponse<{
  ecommerce: {
    daily: GetSpendingLimitsItem;
    monthly: GetSpendingLimitsItem;
    transaction: GetSpendingLimitsItemWithoutUsed;
  };
  pos: {
    daily: GetSpendingLimitsItem;
    monthly: GetSpendingLimitsItem;
    transaction: GetSpendingLimitsItemWithoutUsed;
  };
}>;

export type SetSpendingLimitsRequest = {
  type: string;
  limit: number;
};

export type SetSpendingLimitsResponse = ApiResponse<{
  type: string;
  limit: number;
}>;

export type PrepaidListParams = PaginationParams;
export type PrepaidTranstactionParams = PaginationParams;

export type PrepaidlCardSimpleResponse = MessageResponse;
