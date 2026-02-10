export type HttpLogLevel = "none" | "error" | "info" | "debug";

export type HttpLogger = Pick<Console, "debug" | "info" | "warn" | "error">;

export type HttpLoggingConfig = {
  level?: HttpLogLevel;
  logger?: HttpLogger;
  includeBody?: boolean;
  includeHeaders?: boolean;
};

export interface BFinanceConfig {
  baseUrl: string;
  apiToken: string;
  timeoutMs?: number;
  headers?: Record<string, string>;

  logging?: HttpLoggingConfig;
}

export * from "./common";
