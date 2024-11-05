export declare class UAItem {
    name: string;
    version: string;
    constructor(name: string, version: string);
    static parse(item: string): UAItem;
    toString(): string;
    setName(name: string): void;
    setVersion(version: string): void;
}
export declare class UAParser {
    private type;
    product: UAItem;
    systemInfo: string[];
    engine?: UAItem[];
    engineDetails?: string[];
    extensions?: UAItem[];
    constructor(ua: string);
    toString(ignoreProductName?: boolean): string;
}
declare type MyNavigatorUAData = {
    brands: {
        brand: string;
        version: string;
    }[];
    platform: string;
    mobile: boolean;
};
export declare class EquipmentInfoHandler {
    nav: Navigator;
    seed?: number;
    userAgent?: string;
    appVersion?: string;
    userAgentData?: any;
    brands?: MyNavigatorUAData['brands'];
    fullVersionList?: MyNavigatorUAData['brands'];
    uaFullVersion?: string;
    private rawUserAgentData?;
    private rawToJSON?;
    private rawGetHighEntropyValues?;
    constructor(nav: Navigator, seed?: number, isHook?: boolean);
    setSeed(seed: number, isHook?: boolean): void;
    getValue(key: string): any;
    getHighEntropyValues(): Promise<{
        fullVersionList: {
            brand: string;
            version: string;
        }[] | undefined;
        uaFullVersion: string | undefined;
    }>;
}
export {};
