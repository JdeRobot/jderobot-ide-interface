export interface Error {
  isOpen: boolean;
  msg: string;
  type: ErrorType;
  url: string;
  error: (msg: string) => void;
  error_critical: (msg: string, url: string) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
  close: () => void;
}

export enum ErrorType {
  ERROR,
  ERROR_CRITICAL,
  WARNING,
  INFO,
}
