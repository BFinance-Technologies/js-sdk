import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  IssueBudgetCardRequest,
  IssueBudgetCardResponse,
  BudgetCardByIdResponse,
  SetBudgetCardPinRequest,
  UpdateBudgetCardEmailRequest,
  UpdateBudgetCardPhoneRequest,
  SetVelocityLimitsRequest,
  BudgetCardSensitiveResponse,
  BudgetCardSimpleResponse,
} from "./budgetCards.types";

export class BudgetCardsService extends BaseService {
  getById(cardId: string) {
    return this.get<BudgetCardByIdResponse>(
      ENDPOINTS.budgetCards.byId(encodeURIComponent(cardId)),
    );
  }

  issue(payload: IssueBudgetCardRequest) {
    return this.post<IssueBudgetCardRequest, IssueBudgetCardResponse>(
      ENDPOINTS.budgetCards.issue,
      payload,
    );
  }

  getSensitive(cardId: string) {
    return this.get<BudgetCardSensitiveResponse>(
      ENDPOINTS.budgetCards.sensitive(encodeURIComponent(cardId)),
    );
  }

  freeze(cardId: string) {
    return this.post<undefined, BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.freeze(encodeURIComponent(cardId)),
    );
  }

  unfreeze(cardId: string) {
    return this.post<undefined, BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.unfreeze(encodeURIComponent(cardId)),
    );
  }

  setPin(cardId: string, payload: SetBudgetCardPinRequest) {
    return this.post<SetBudgetCardPinRequest, BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.pin(encodeURIComponent(cardId)),
      payload,
    );
  }

  updateEmail(cardId: string, payload: UpdateBudgetCardEmailRequest) {
    return this.post<UpdateBudgetCardEmailRequest, BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.email(encodeURIComponent(cardId)),
      payload,
    );
  }

  updatePhoneNumber(cardId: string, payload: UpdateBudgetCardPhoneRequest) {
    return this.post<UpdateBudgetCardPhoneRequest, BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.phone(encodeURIComponent(cardId)),
      payload,
    );
  }

  setVelocityLimits(cardId: string, payload: SetVelocityLimitsRequest) {
    return this.post<SetVelocityLimitsRequest, BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.velocity(encodeURIComponent(cardId)),
      payload,
    );
  }

  deleteCard(cardId: string) {
    return this.delete<BudgetCardSimpleResponse>(
      ENDPOINTS.budgetCards.delete(encodeURIComponent(cardId)),
    );
  }
}
