import { HttpClient } from "../http/HttpClient";

export class BaseService {
  protected readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected get<
    TRes,
    TParams extends Record<string, any> | undefined = undefined,
  >(url: string, params?: TParams): Promise<TRes> {
    return this.http.request<TRes, undefined, TParams>(
      "GET",
      url,
      undefined,
      params,
    );
  }

  protected post<TReq = undefined, TRes = unknown>(
    url: string,
    data?: TReq,
  ): Promise<TRes> {
    return this.http.request<TRes, TReq, undefined>("POST", url, data);
  }

  protected delete<TRes = unknown>(url: string): Promise<TRes> {
    return this.http.request<TRes, undefined, undefined>("DELETE", url);
  }
}
