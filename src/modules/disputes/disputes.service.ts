import { ENDPOINTS } from "../../constants";
import { BaseService } from "../baseService";
import type {
  CreateDisputeRequest,
  CreateDisputeResponse,
  GetDisputeStatusResponse,
  CancelDisputeResponse,
} from "./disputes.types";

export class DisputesService extends BaseService {
  create(payload: CreateDisputeRequest) {
    return this.post<CreateDisputeRequest, CreateDisputeResponse>(
      ENDPOINTS.disputes.create,
      payload,
    );
  }

  getStatus(disputeId: string) {
    return this.get<GetDisputeStatusResponse>(
      ENDPOINTS.disputes.status(encodeURIComponent(disputeId)),
    );
  }

  cancel(disputeId: string) {
    return this.post<undefined, CancelDisputeResponse>(
      ENDPOINTS.disputes.cancel(encodeURIComponent(disputeId)),
    );
  }
}
