/**
 * @example
 * debounce(()=>{})
 * debounce(()=>{}, 500)
 */
export declare const debounce: <T extends (...args: any) => any>(func: T, wait?: number | undefined) => (...args: Parameters<T>) => void;
/**
 * 合并async函数，防止多次调用
 * @example
 * debouncedAsync(async()=>{})
 * debouncedAsync(()=>new Promise(...))
 */
export declare const debouncedAsync: <T extends (...args: any[]) => Promise<any>>(func: T) => (...args: Parameters<T>) => ReturnType<T>;
