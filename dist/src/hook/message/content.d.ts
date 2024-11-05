export declare const IDENTIFY = "__MyFingerprint__";
/**
 * 解包postMessage请求体
 */
export declare const unwrapMessage: (msg: any) => any;
/**
 * 包装Message
 */
export declare const wrapMessage: <T = any>(msg: T) => {
    __MyFingerprint__: T;
};
/**
 * 设置hook记录
 */
export declare const postSetHookRecords: (hookRecords: Partial<Record<HookFingerprintKey, number>>) => void;
/**
 * 修改配置
 */
export declare const postSetConfig: (config: DeepPartial<LocalStorageConfig>) => void;
