import { HttpClient } from "../http/HttpClient";
import { RequestOptions } from "../types";

export class BaseService {
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected get<
    TRes,
    TParams extends Record<string, any> | undefined = undefined,
  >(url: string, params?: TParams, options?: RequestOptions): Promise<TRes> {
    return this.http.request<TRes, undefined, TParams>(
      "GET",
      url,
      undefined,
      params,
      options,
    );
  }

  protected post<TReq = undefined, TRes = unknown>(
    url: string,
    data?: TReq,
    options?: RequestOptions,
  ): Promise<TRes> {
    return this.http.request<TRes, TReq, undefined>(
      "POST",
      url,
      data,
      undefined,
      options,
    );
  }

  protected delete<TRes = unknown>(
    url: string,
    options?: RequestOptions,
  ): Promise<TRes> {
    return this.http.request<TRes, undefined, undefined>(
      "DELETE",
      url,
      undefined,
      undefined,
      options,
    );
  }
}
