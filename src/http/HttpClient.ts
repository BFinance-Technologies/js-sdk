import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import type {
  BFinanceConfig,
  HttpLogLevel,
  HttpLogger,
  RequestOptions,
} from "../types";
import { HttpError, NetworkError } from "./HttpError";

type RequestMeta = {
  requestId: string;
  startedAt: number;
};

function genRequestId() {
  return Math.random().toString(16).slice(2, 10);
}

function isLevelEnabled(current: HttpLogLevel, needed: HttpLogLevel) {
  const order: Record<HttpLogLevel, number> = {
    none: 0,
    error: 1,
    info: 2,
    debug: 3,
  };
  return order[current] >= order[needed];
}

export class HttpClient {
  private client: AxiosInstance;

  private logLevel: HttpLogLevel;
  private logger: HttpLogger;
  private includeBody: boolean;
  private includeHeaders: boolean;

  constructor(config: BFinanceConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeoutMs ?? 3000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiToken}`,
        ...config.headers,
      },
    });

    this.logLevel = config.logging?.level ?? "none";
    this.logger = config.logging?.logger ?? console;
    this.includeBody = config.logging?.includeBody ?? false;
    this.includeHeaders = config.logging?.includeHeaders ?? false;

    this.setupLoggingInterceptors();
  }

  private setupLoggingInterceptors() {
    this.client.interceptors.request.use((req) => {
      const meta: RequestMeta = {
        requestId: genRequestId(),
        startedAt: Date.now(),
      };
      (req as any).__bf_meta = meta;

      if (isLevelEnabled(this.logLevel, "info")) {
        this.logger.info(
          `[BFinance SDK] -> ${req.method?.toUpperCase()} ${req.baseURL ?? ""}${req.url} (#${meta.requestId})`,
        );
      }

      if (isLevelEnabled(this.logLevel, "debug")) {
        this.logger.debug(
          `[BFinance SDK] request details (#${meta.requestId})`,
          {
            params: req.params,
            data: this.includeBody ? req.data : undefined,
            headers: this.includeHeaders ? req.headers : undefined,
          },
        );
      }

      return req;
    });

    this.client.interceptors.response.use(
      (res: AxiosResponse) => {
        const meta: RequestMeta | undefined = (res.config as any).__bf_meta;
        const ms = meta ? Date.now() - meta.startedAt : undefined;

        if (isLevelEnabled(this.logLevel, "info")) {
          this.logger.info(
            `[BFinance SDK] <- ${res.status} ${res.config.method?.toUpperCase()} ${res.config.url} (#${meta?.requestId}) ${ms ?? ""}ms`,
          );
        }

        if (isLevelEnabled(this.logLevel, "debug")) {
          this.logger.debug(
            `[BFinance SDK] response details (#${meta?.requestId})`,
            {
              data: this.includeBody ? res.data : undefined,
              headers: this.includeHeaders ? res.headers : undefined,
            },
          );
        }

        return res;
      },
      (error: AxiosError) => {
        const cfg = error.config as
          | (AxiosRequestConfig & { __bf_meta?: RequestMeta })
          | undefined;
        const meta = cfg?.__bf_meta;

        if (isLevelEnabled(this.logLevel, "error")) {
          const status = error.response?.status;
          const method = cfg?.method?.toUpperCase();
          const url = cfg?.url;

          this.logger.error(
            `[BFinance SDK] !! ${status ?? "NET"} ${method ?? ""} ${url ?? ""} (#${meta?.requestId ?? "?"})`,
            {
              message: error.message,
              code: error.code,
              responseData: this.includeBody ? error.response?.data : undefined,
            },
          );
        }

        return Promise.reject(error);
      },
    );
  }

  async request<TRes, TReq = undefined, TParams = undefined>(
    method: string,
    url: string,
    data?: TReq,
    params?: TParams,
    options?: RequestOptions,
  ): Promise<TRes> {
    try {
      const res = await this.client.request({
        method,
        url,
        data,
        params,
        headers: {
          ...(options?.headers ?? {}),
        },
      });

      const body = res.data as any;

      if (body && typeof body === "object" && body.status === "error") {
        const message =
          typeof body.message === "string" ? body.message : "API error";
        throw new HttpError(message, 500, body);
      }

      return res.data as TRes;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const resData = error.response?.data;
        let message = error.message;

        if (
          resData &&
          typeof resData === "object" &&
          "message" in (resData as any)
        ) {
          message = String((resData as any).message);
        }

        throw new HttpError(message, error.response?.status, resData);
      }

      if (error instanceof HttpError) throw error;

      throw new NetworkError("Network error", error);
    }
  }
}
