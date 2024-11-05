export interface SyncExternalParams {
    key: number;
    data: Object;
}
interface IExternalNavigator {
    jsCallNative(params: SyncExternalParams, onSuccess: () => void): void;
    nativeCallJs(): void;
}
declare class ExternalNavigator implements IExternalNavigator {
    constructor();
    nativeCallJs(): void;
    jsCallNative(params: SyncExternalParams, onSuccess: (resultParams: SyncExternalParams) => void): void;
    private sendErrorInfo;
}
export declare const nativeExternal: ExternalNavigator;
export {};
