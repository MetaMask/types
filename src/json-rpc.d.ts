type Maybe<T> = Partial<T> | null | undefined;

/**
 * A String specifying the version of the JSON-RPC protocol.
 * MUST be exactly "2.0".
 */
export type JsonRpcVersion = '2.0';

/**
 * An identifier established by the Client that MUST contain a String, Number,
 * or NULL value if included. If it is not included it is assumed to be a
 * notification. The value SHOULD normally not be Null and Numbers SHOULD
 * NOT contain fractional parts.
 */
export type JsonRpcId = number | string | null;

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
  stack?: string;
}

export interface JsonRpcRequest<T> {
  jsonrpc: JsonRpcVersion;
  method: string;
  id: JsonRpcId;
  params?: T;
}

export interface JsonRpcNotification<T> {
  jsonrpc: JsonRpcVersion;
  method: string;
  params?: T;
}

interface JsonRpcResponseBase {
  jsonrpc: JsonRpcVersion;
  id: JsonRpcId;
}

export interface JsonRpcSuccess<T> extends JsonRpcResponseBase {
  result: Maybe<T>;
}

export interface JsonRpcFailure extends JsonRpcResponseBase {
  error: JsonRpcError;
}

export type JsonRpcResponse<T> = JsonRpcSuccess<T> | JsonRpcFailure;

export interface PendingJsonRpcResponse<T> extends JsonRpcResponseBase {
  result?: T;
  error?: Error | JsonRpcError;
}

export type JsonRpcEngineCallbackError = Error | JsonRpcError | null;

export type JsonRpcEngineReturnHandler = (
  done: (error?: JsonRpcEngineCallbackError) => void,
) => void;

export type JsonRpcEngineNextCallback = (
  returnHandlerCallback?: JsonRpcEngineReturnHandler,
) => void;

export type JsonRpcEngineEndCallback = (
  error?: JsonRpcEngineCallbackError,
) => void;

export type JsonRpcMiddleware<T, U> = (
  req: JsonRpcRequest<T>,
  res: PendingJsonRpcResponse<U>,
  next: JsonRpcEngineNextCallback,
  end: JsonRpcEngineEndCallback,
) => void;
