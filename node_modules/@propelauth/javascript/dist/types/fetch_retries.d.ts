export declare const DEFAULT_RETRIES = 3;
export declare const runWithRetriesOnAnyError: <T>(fn: () => Promise<T>) => Promise<T>;
