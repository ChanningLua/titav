/**
 * 版本号比较
 * @returns v1大于v2，返回1；v1小于v2，返回-1；v1等于v2，返回0
 */
export declare const compareVersions: (v1: string, v2: string) => -1 | 0 | 1;
/**
 * 生成最大32位的种子
 */
export declare const genRandomSeed: () => number;
/**
 * 对字符串hash，生成32位种子
 */
export declare const hashNumberFromString: (input: string) => number;
/**
 * 过滤arr中的undefined和false值
 */
export declare const arrayFilter: <T>(arr: (boolean | T | undefined)[]) => T[];
/**
 * url转带端口的host
 */
export declare const urlToHttpHost: (url: string) => string | undefined;
/**
 * 版本号随机偏移
 * @param sourceVersion 源版本号
 * @param seed 种子
 * @param maxSubVersionNumber 最大子版本数量
 * @param mainVersionOffset 最大主版本号偏移
 * @param subVersionOffset 最大子版本号偏移
 * @returns
 */
export declare const versionRandomOffset: (sourceVersion: string, seed: number, maxSubVersionNumber?: number | undefined, maxMainVersionOffset?: number | undefined, maxSubVersionOffset?: number | undefined) => string;
/**
 * 获取主要版本号
 */
export declare const getMainVersion: (sourceVersion: string) => string;
