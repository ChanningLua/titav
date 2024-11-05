/**
 * 线性同余，根据seed产生随机数
 */
export declare const seededRandom: (seed: number, max?: number | undefined, min?: number | undefined) => number;
/**
 * 随机屏幕宽高信息
 */
export declare const randomScreenSize: (seed: number) => SizeInfo;
/**
 * 随机语言标识
 */
export declare const randomLanguage: (seed: number) => string;
/**
 * 随机逻辑处理器数量
 */
export declare const randomHardwareConcurrency: (seed: number) => number;
/**
 * 随机颜色深度
 */
export declare const randomColorDepth: (seed: number) => number;
/**
 * 随机位深度
 */
export declare const randomPixelDepth: (seed: number) => number;
/**
 * 随机canvas噪音
 */
export declare const randomCanvasNoise: (seed: number) => string;
/**
 * 随机音频噪音
 */
export declare const randomAudioNoise: (seed: number) => number;
export declare const randomWebglRander: (seed: number) => string;
export declare const randomWebglColor: (seed: number) => string;
