import { BaseService } from "../baseService";
import { ENDPOINTS } from "../../constants";
import { omitUndefined } from "../../utils/omitUndefined";

import type {
  PrepaidListParams,
  GetPrepaidCardsResponse,
  IssuePrepaidCardResponse,
  ReissuePrepaidCardRequest,
  ReissuePrepaidCardResponse,
  GetPrepaidCardDetailsResponse,
  GetPrepaidCardTransactionsResponse,
  GetPrepaidCardSensitiveResponse,
  GenerateTopUpAddressParams,
  GenerateTopUpAddressResponse,
  IssuePrepaidCardRequst,
  PrepaidTranstactionParams,
  PrepaidlCardSimpleResponse,
  UpdateEmailRequest,
  UpdatePhoneRequest,
  TopUpRequest,
  SetPinRequest,
  WithdrawFundsRequest,
  ApproveTransactionRequest,
  GetSpendingLimitsResponse,
  SetSpendingLimitsRequest,
  SetSpendingLimitsResponse,
} from "./prepaidCards.types";
import { IdempotencyOptions } from "../../types";

export class PrepaidCardsService extends BaseService {
  getList(params?: PrepaidListParams) {
    const queryParams = omitUndefined<PrepaidListParams>(params ?? {});
    return this.get<GetPrepaidCardsResponse, PrepaidListParams>(
      ENDPOINTS.prepaidCards.list,
      queryParams,
    );
  }

  issue(payload: IssuePrepaidCardRequst) {
    return this.post<IssuePrepaidCardRequst, IssuePrepaidCardResponse>(
      ENDPOINTS.prepaidCards.issue,
      payload,
    );
  }

  reissue(payload: ReissuePrepaidCardRequest) {
    return this.post<ReissuePrepaidCardRequest, ReissuePrepaidCardResponse>(
      ENDPOINTS.prepaidCards.reissue,
      payload,
    );
  }

  getDetails(cardId: string) {
    return this.get<GetPrepaidCardDetailsResponse>(
      ENDPOINTS.prepaidCards.byId(encodeURIComponent(cardId)),
    );
  }

  getTransactions(cardId: string, params?: PrepaidTranstactionParams) {
    const queryParams = omitUndefined<PrepaidTranstactionParams>(params ?? {});
    return this.get<
      GetPrepaidCardTransactionsResponse,
      PrepaidTranstactionParams
    >(
      ENDPOINTS.prepaidCards.transactions(encodeURIComponent(cardId)),
      queryParams,
    );
  }

  getSensitive(cardId: string) {
    return this.get<GetPrepaidCardSensitiveResponse>(
      ENDPOINTS.prepaidCards.sensitive(encodeURIComponent(cardId)),
    );
  }

  freeze(cardId: string) {
    return this.post<undefined, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.freeze(encodeURIComponent(cardId)),
    );
  }

  unfreeze(cardId: string) {
    return this.post<undefined, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.unfreeze(encodeURIComponent(cardId)),
    );
  }

  deleteCard(cardId: string) {
    return this.delete<PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.delete(encodeURIComponent(cardId)),
    );
  }

  updateEmail(cardId: string, payload: UpdateEmailRequest) {
    return this.post<UpdateEmailRequest, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.email(encodeURIComponent(cardId)),
      payload,
    );
  }

  updatePhoneNumber(cardId: string, payload: UpdatePhoneRequest) {
    return this.post<UpdatePhoneRequest, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.phone(encodeURIComponent(cardId)),
      payload,
    );
  }

  topUp(cardId: string, payload: TopUpRequest, options?: IdempotencyOptions) {
    return this.post<TopUpRequest, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.topup(encodeURIComponent(cardId)),
      payload,
      options?.idempotencyKey
        ? {
            headers: { "Idempotency-Key": options.idempotencyKey },
          }
        : undefined,
    );
  }

  setPin(cardId: string, payload: SetPinRequest) {
    return this.post<SetPinRequest, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.pin(encodeURIComponent(cardId)),
      payload,
    );
  }

  withdrawFunds(
    cardId: string,
    payload: WithdrawFundsRequest,
    options?: IdempotencyOptions,
  ) {
    return this.post<WithdrawFundsRequest, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.withdraw(encodeURIComponent(cardId)),
      payload,
      options?.idempotencyKey
        ? {
            headers: { "Idempotency-Key": options.idempotencyKey },
          }
        : undefined,
    );
  }

  approveTransaction(cardId: string, payload: ApproveTransactionRequest) {
    return this.post<ApproveTransactionRequest, PrepaidlCardSimpleResponse>(
      ENDPOINTS.prepaidCards.approveTransaction(encodeURIComponent(cardId)),
      payload,
    );
  }

  generateTopUpAddress(cardId: string, params: GenerateTopUpAddressParams) {
    return this.get<GenerateTopUpAddressResponse, GenerateTopUpAddressParams>(
      ENDPOINTS.prepaidCards.address(encodeURIComponent(cardId)),
      params,
    );
  }

  getSpendingLimits(cardId: string) {
    return this.get<GetSpendingLimitsResponse>(
      ENDPOINTS.prepaidCards.limits(encodeURIComponent(cardId)),
    );
  }

  setSpendingLimits(cardId: string, payload: SetSpendingLimitsRequest) {
    return this.post<SetSpendingLimitsRequest, SetSpendingLimitsResponse>(
      ENDPOINTS.prepaidCards.limits(encodeURIComponent(cardId)),
      payload,
    );
  }
}
