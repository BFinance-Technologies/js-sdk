export type ApiSuccess<T> = {
  status: "success";
  data: T;
  message?: string;
};

export type ApiError = {
  status: "error";
  message?: string;
  errorId?: string;
  data?: unknown;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type MessageResponse = {
  status: "success" | "error";
  message: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type ISODateTime = string;
export type DateResponse = ISODateTime | Date;

export type Id = string;
