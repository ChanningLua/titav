import { EquipmentInfoHandler } from "./../../utils/equipment";
export declare type HookTask = {
    name: string;
    onlyOnceEnable?: boolean;
    condition?: (fh: FingerprintHandler) => boolean | undefined;
    onEnable?: (fh: FingerprintHandler) => void;
    onDisable?: (fh: FingerprintHandler) => void;
};
export interface RawHookObject {
    navigatorDescriptor: PropertyDescriptor;
    screenDescriptor: PropertyDescriptor;
    DateTimeFormat: typeof Intl.DateTimeFormat;
    getOwnPropertyDescriptor: typeof Object.getOwnPropertyDescriptor;
    toDataURL: typeof HTMLCanvasElement.prototype.toDataURL;
    createDynamicsCompressor: typeof OfflineAudioContext.prototype.createDynamicsCompressor;
    wglGetParameter: typeof WebGLRenderingContext.prototype.getParameter;
    wgl2GetParameter: typeof WebGL2RenderingContext.prototype.getParameter;
    wglShaderSource: typeof WebGLRenderingContext.prototype.shaderSource;
    wgl2ShaderSource: typeof WebGL2RenderingContext.prototype.shaderSource;
    getTimezoneOffset: typeof Date.prototype.getTimezoneOffset;
    appendChild: typeof HTMLElement.prototype.appendChild;
    insertBefore: typeof HTMLElement.prototype.insertBefore;
    replaceChild: typeof HTMLElement.prototype.replaceChild;
}
/**
 * 发送record消息
 */
export declare const sendRecordMessage: () => void;
/**
 * 记录并发送消息
 */
export declare const recordAndSend: (key: string) => void;
export declare type WindowInfo = {
    tabId: number;
    host: string;
    inWhitelist: boolean;
};
declare type SeedInfo = {
    page: number;
    domain: number;
    browser: number;
    global: number;
};
export declare class FingerprintHandler {
    win: Window & typeof globalThis;
    info: WindowInfo;
    seed: SeedInfo;
    conf: DeepPartial<LocalStorageConfig>;
    equipmentHandler?: EquipmentInfoHandler;
    rawObjects: Partial<RawHookObject>;
    private onlyRecord;
    constructor(win: Window & typeof globalThis, info: WindowInfo, config: DeepPartial<LocalStorageConfig>);
    /**
     * 监听消息
     */
    private listenMessage;
    /**
     * 脚本是否启动
     */
    isEnable(): boolean;
    /**
     * 配置
     */
    setConfig(config?: DeepPartial<LocalStorageConfig>): void;
    /**
     * 刷新hook内容
     */
    refresh(): void;
    /**
     * hook iframe
     */
    hookIframe(iframe: HTMLIFrameElement): void;
    /**
     * 是否所有字段的type都是default
     * ops为空则返回true
     */
    isAllDefault(ops?: DeepPartial<Record<string, HookMode>>): boolean;
    /**
     * 获取value对应的的seed
     */
    getSeedByHookValue: (value?: any) => number | null;
    getValue(prefix: string, key: string, opt?: string): any | null;
}
export {};
