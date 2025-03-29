export enum ERROR_CODES {
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  CONFLICT = 'CONFLICT',
}

export type ErrorContext = {
  errorMessage?: string;
  code: string;
  ids?: Record<string, string>;
  error?: {
    message?: string;
    response: {
      statusText?: string;
    };
  };
};
