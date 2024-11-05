import { ContentMsg } from './../../hook/types/enum'

export const IDENTIFY = '__MyFingerprint__'

/**
 * 解包postMessage请求体
 */
export const unwrapMessage = (msg: any): any => {
  return msg[IDENTIFY]
}

/**
 * 包装Message
 */
export const wrapMessage = <T=any>(msg: T) => {
  return {[IDENTIFY]: msg}
}

/**
 * 设置hook记录
 */
export const postSetHookRecords = (hookRecords: Partial<Record<HookFingerprintKey, number>>) => {
  postMessage(wrapMessage<PostSetHookRecords>({
    type: ContentMsg.SetHookRecords,
    data: hookRecords,
  }), location.origin)
}

/**
 * 修改配置
 */
export const postSetConfig = (config: DeepPartial<LocalStorageConfig>) => {
  postMessage(wrapMessage<PostSetConfig>({
    type: ContentMsg.SetConfig,
    config,
  }), location.origin)
}