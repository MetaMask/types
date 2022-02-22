import type {
  JsonRpcEngineEndCallback,
  JsonRpcEngineNextCallback,
  JsonRpcRequest,
  PendingJsonRpcResponse,
} from './json-rpc';

/**
 * Makes every specified property of the specified object type mutable.
 *
 * @template T - The object whose readonly properties to make mutable.
 * @template TargetKey - The property key(s) to make mutable.
 */
export type Mutable<
  T extends Record<string, unknown>,
  TargetKey extends string
> = {
  -readonly [Key in keyof Pick<T, TargetKey>]: T[Key];
} &
  {
    [Key in keyof Omit<T, TargetKey>]: T[Key];
  };

export type HandlerMiddlewareFunction<T, U, V> = (
  req: JsonRpcRequest<U>,
  res: PendingJsonRpcResponse<V>,
  next: JsonRpcEngineNextCallback,
  end: JsonRpcEngineEndCallback,
  hooks: T,
) => void | Promise<void>;

type BaseHandlerExport = {
  methodNames: string[];
};

/**
 * We use a mapped object type in order to create a type that requires the
 * presence of the names of all hooks for the given handler.
 * This can then be used to select only the necessary hooks whenever a method
 * is called for purposes of POLA.
 */
export type HookNames<T> = {
  [Property in keyof T]: true;
};

export type PermittedHandlerExport<T, U, V> = {
  implementation: HandlerMiddlewareFunction<T, U, V>;
  hookNames: HookNames<T>;
} & BaseHandlerExport;
