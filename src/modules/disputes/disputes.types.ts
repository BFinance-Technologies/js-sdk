import { ApiResponse, DateResponse, Id } from "../../types";

export type DisputeId = Id;

export type CreateDisputeRequest = {
  cardId: string;
  transactionId: string;
  textEvidence: string;
  files?: string[];
};

export type CreateDisputeResponse = ApiResponse<{
  id: DisputeId;
  status: string;
  textEvidence: string;
  files: string[];
  createdAt: DateResponse;
}>;

export type GetDisputeStatusResponse = ApiResponse<{
  id: DisputeId;
  status: string;
  response?: string;
}>;

export type CancelDisputeResponse = ApiResponse<{
  id: DisputeId;
  status: string;
}>;
