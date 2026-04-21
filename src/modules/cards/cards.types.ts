import {
  ApiResponse,
  DateResponse,
  Id,
  MessageResponse,
  PaginationParams,
} from "../../types";

export type CardId = Id;

export type CardItem = {
  id: CardId;
  maskedCardNumber: string;
  currency: string;
  status: string;
  externalCardId: string;
  cardBalance: number;
  label: string;
  brand: string;
  cardHolder: CardHolder;
  cardType: string;
};

export type GetCardsResponse = ApiResponse<{
  cards: CardItem[];
  page: number;
  limit: number;
  totalPages: number;
}>;

type IssueCardConfiguration = {
  displayName?: string;
  address?: string;
};

export type IssueCardRequst = {
  typeId: string;
  initialBalance: number;
  firstName: string;
  lastName: string;
  externalId: string;
  label?: string;
  customerId?: string;
  configuration?: IssueCardConfiguration;
};

export type IssuedCard = {
  id: CardId;
  cardNumber: string;
  cardExpire: string;
  cardCVC: string;
  cardBalance: number;
  currency: string;
  maskedCardNumber: string;
  brand: string;
  label: string;
};

export type IssueCardResponse = ApiResponse<{
  card: IssuedCard;
}>;

export type ReissueCardRequest = {
  cardId: CardId;
  initialBalance: number;
};

export type ReissuedCard = {
  id: CardId;
  cardExpire: string;
  cardBalance: number;
  currency: string;
  maskedCardNumber: string;
  brand: string;
  label: string;
};

export type ReissueCardResponse = ApiResponse<{
  card: ReissuedCard;
}>;

export type CardBalance = {
  value: number;
  currency: string;
};

export type CardSensitive = {
  number: string;
  expire: string;
  cvc: string;
};

export type CardHolder = {
  firstName: string;
  lastName: string;
  customerId: string;
};

export type GetCardDetailsResponse = ApiResponse<{
  id: CardId;
  maskedCardNumber: string;
  sensetive: CardSensitive;
  currency: string;
  status: string;
  externalCardId: string;
  balance: CardBalance;
  label: string;
  cardHolder: CardHolder;
  email: string;
  phone: string;
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

export type GetCardTransactionsResponse = ApiResponse<{
  transactions: CardTransaction[];
}>;

export type GetCardSensitiveResponse = ApiResponse<{
  number: string;
  expire: string;
  cvc: string;
}>;

export type UpdateEmailRequest = { email: string };
export type UpdatePhoneRequest = { phone: string };
export type TopUpRequest = { amount: number; note?: string };
export type SetPinRequest = { pin: string };
export type WithdrawFundsRequest = { amount: number };
export type UpdateVirtualCardArtRequest = { cardArtId: string };

export type UpdateVirtualCardArtResponse = ApiResponse<{}>;

export type GetAvailableCardTypes = {
  types: {
    id: string;
    name: string;
    cardCurrency: string;
    price: string;
    brand: "visa" | (string & {});
  }[];
};

export type GetAvailableCardTypesResponse = ApiResponse<GetAvailableCardTypes>;

export type GenerateTopUpAddressAmount = {
  min: number;
  max: number;
  fee: number;
};

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
  type:
    | "ecommerce-daily"
    | "ecommerce-monthly"
    | "ecommerce-transaction"
    | "pos-daily"
    | "pos-monthly"
    | "pos-transaction";
  limit: number;
};

export type SetSpendingLimitsResponse = ApiResponse<{
  type: string;
  limit: number;
}>;

export type CardsListParams = PaginationParams & {
  query?: string;
  customerIds?: string;
  statuses?: "active" | "frozen" | "pending" | (string & {});
};
export type TranstactionParams = PaginationParams;

export type CardSimpleResponse = MessageResponse;
