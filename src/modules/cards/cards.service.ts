import { BaseService } from "../baseService";
import { ENDPOINTS } from "../../constants";
import { omitUndefined } from "../../utils/omitUndefined";

import type {
  ReissueCardRequest,
  ReissueCardResponse,
  GetCardDetailsResponse,
  GetCardTransactionsResponse,
  GetCardSensitiveResponse,
  TranstactionParams,
  CardSimpleResponse,
  UpdateEmailRequest,
  UpdatePhoneRequest,
  TopUpRequest,
  SetPinRequest,
  WithdrawFundsRequest,
  GetSpendingLimitsResponse,
  SetSpendingLimitsRequest,
  SetSpendingLimitsResponse,
  CardsListParams,
  GetCardsResponse,
  IssueCardRequst,
  IssueCardResponse,
  UpdateVirtualCardArtRequest,
  UpdateVirtualCardArtResponse,
  GetAvailableCardTypesResponse,
} from "./cards.types";

export class CardsService extends BaseService {
  getDetails(cardId: string) {
    return this.get<GetCardDetailsResponse>(
      ENDPOINTS.cards.details(encodeURIComponent(cardId)),
    );
  }

  getList(params?: CardsListParams) {
    const queryParams = omitUndefined<CardsListParams>(params ?? {});
    return this.get<GetCardsResponse, CardsListParams>(
      ENDPOINTS.cards.list,
      queryParams,
    );
  }

  issue(payload: IssueCardRequst) {
    return this.post<IssueCardRequst, IssueCardResponse>(
      ENDPOINTS.cards.issue,
      payload,
    );
  }

  reissue(payload: ReissueCardRequest) {
    return this.post<ReissueCardRequest, ReissueCardResponse>(
      ENDPOINTS.cards.reissue,
      payload,
    );
  }

  getTransactions(cardId: string, params?: TranstactionParams) {
    const queryParams = omitUndefined<TranstactionParams>(params ?? {});
    return this.get<GetCardTransactionsResponse, TranstactionParams>(
      ENDPOINTS.cards.transactions(encodeURIComponent(cardId)),
      queryParams,
    );
  }

  getSensitive(cardId: string) {
    return this.get<GetCardSensitiveResponse>(
      ENDPOINTS.cards.sensitive(encodeURIComponent(cardId)),
    );
  }

  freeze(cardId: string) {
    return this.post<undefined, CardSimpleResponse>(
      ENDPOINTS.cards.freeze(encodeURIComponent(cardId)),
    );
  }

  unfreeze(cardId: string) {
    return this.post<undefined, CardSimpleResponse>(
      ENDPOINTS.cards.unfreeze(encodeURIComponent(cardId)),
    );
  }

  deleteCard(cardId: string) {
    return this.delete<CardSimpleResponse>(
      ENDPOINTS.cards.delete(encodeURIComponent(cardId)),
    );
  }

  topUp(cardId: string, payload: TopUpRequest) {
    return this.post<TopUpRequest, CardSimpleResponse>(
      ENDPOINTS.cards.topup(encodeURIComponent(cardId)),
      payload,
    );
  }

  withdrawFunds(cardId: string, payload: WithdrawFundsRequest) {
    return this.post<WithdrawFundsRequest, CardSimpleResponse>(
      ENDPOINTS.cards.withdraw(encodeURIComponent(cardId)),
      payload,
    );
  }

  updateEmail(cardId: string, payload: UpdateEmailRequest) {
    return this.post<UpdateEmailRequest, CardSimpleResponse>(
      ENDPOINTS.cards.email(encodeURIComponent(cardId)),
      payload,
    );
  }

  updatePhoneNumber(cardId: string, payload: UpdatePhoneRequest) {
    return this.post<UpdatePhoneRequest, CardSimpleResponse>(
      ENDPOINTS.cards.phone(encodeURIComponent(cardId)),
      payload,
    );
  }

  setPin(cardId: string, payload: SetPinRequest) {
    return this.post<SetPinRequest, CardSimpleResponse>(
      ENDPOINTS.cards.pin(encodeURIComponent(cardId)),
      payload,
    );
  }

  updateVirtualCardArt(cardId: string, payload: UpdateVirtualCardArtRequest) {
    return this.post<UpdateVirtualCardArtRequest, UpdateVirtualCardArtResponse>(
      ENDPOINTS.cards.updateVirtualCardArt(encodeURIComponent(cardId)),
      payload,
    );
  }

  getAvailableCardTypes() {
    return this.get<GetAvailableCardTypesResponse>(
      ENDPOINTS.cards.getAvailableCardTypes,
    );
  }

  getSpendingLimits(cardId: string) {
    return this.get<GetSpendingLimitsResponse>(
      ENDPOINTS.cards.limits(encodeURIComponent(cardId)),
    );
  }

  setSpendingLimits(cardId: string, payload: SetSpendingLimitsRequest) {
    return this.post<SetSpendingLimitsRequest, SetSpendingLimitsResponse>(
      ENDPOINTS.cards.limits(encodeURIComponent(cardId)),
      payload,
    );
  }
}
