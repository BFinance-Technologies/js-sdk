import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  OrderPhysicalCardRequest,
  ActivatePhysicalCardRequest,
  PhysicalCardSimpleResponse,
} from "./physicalCards.types";

export class PhysicalCardsService extends BaseService {
  order(cardId: string, payload: OrderPhysicalCardRequest) {
    return this.post<OrderPhysicalCardRequest, PhysicalCardSimpleResponse>(
      ENDPOINTS.physicalCards.order(encodeURIComponent(cardId)),
      payload,
    );
  }

  activate(cardId: string, payload: ActivatePhysicalCardRequest) {
    return this.post<ActivatePhysicalCardRequest, PhysicalCardSimpleResponse>(
      ENDPOINTS.physicalCards.activate(encodeURIComponent(cardId)),
      payload,
    );
  }
}
