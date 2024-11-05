import { compareVersions, genRandomSeed, urlToHttpHost } from "./../../utils/base";
import { debounce, debouncedAsync } from "./../../utils/timer";
import deepmerge from "deepmerge";
import { HookType } from './../../hook/types/enum'
import { EquipmentInfoHandler } from "./../../utils/equipment";

const UA_NET_RULE_ID = 1

var _local: LocalStorageObject | any;
// const hookRecords = new Map<number, Partial<Record<HookFingerprintKey, number>>>()


/**
 * 生成默认配置
 */
const genDefaultLocalStorage = (): LocalStorage => {
  //@ts-ignore
  const defaultHook: DefaultHookMode = { type: HookType.default }
  const browserHook: BaseHookMode = { type: HookType.global }
  return {
    version: "0.1",
    config: {
      enable: true,
      customSeed: genRandomSeed(),
      browserSeed: genRandomSeed(),
      fingerprint: {
        navigator: {
          equipment: browserHook,
          language: defaultHook,
          hardwareConcurrency: defaultHook,
        },
        screen: {
          height: defaultHook,
          width: defaultHook,
          colorDepth: defaultHook,
          pixelDepth: defaultHook,
        },
        other: {
          timezone: defaultHook,
          canvas: browserHook,
          audio: browserHook,
          webgl: defaultHook,
          webrtc: defaultHook,
        },
      },
      language: navigator.language,
      hookNetRequest: true,
      hookBlankIframe: true,
    },
    whitelist: []
  }
}

/**
 * 初始化默认配置
 */
const initLocalConfig = debouncedAsync(async () => {

  var storage: LocalStorage = genDefaultLocalStorage()  
  _local = { ...storage, whitelist: new Set(storage.whitelist) }

  refreshRequestHeaderUA();
  return _local;
})

/**
 * 获取配置
 */
export const getLocalStorage = async () => {
  return await initLocalConfig()
}


/**
 * 刷新请求头UA
 */
export async function refreshRequestHeaderUA () {
  
  let mode = _local.config.fingerprint.navigator.equipment;

  /// Get Seed
  let seed: number | undefined;
  switch (mode.type) {
    case HookType.browser: {
      seed = _local.config.browserSeed
      break;
    }
    case HookType.global: {
      seed = _local.config.customSeed
      break;
    }
    default: {
      seed = undefined
    }
  }

  if (seed) {
    try {
      const eh = new EquipmentInfoHandler(navigator, seed)
      var options = {
        removeRuleIds: [UA_NET_RULE_ID],
        addRules: []
      }

      var requestHeaders = []
      if (eh.userAgent) {
        requestHeaders.push({
          header: "User-Agent",
          // operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          value: eh.userAgent,
        })
      }
      if (eh.brands) {
        requestHeaders.push({
          header: "Sec-Ch-Ua",
          // operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          value: eh.brands.map((brand) => `"${brand.brand}";v="${brand.version}"`).join(", "),
        })
      }
      
      const heValues = await eh.getHighEntropyValues()
      if (heValues.fullVersionList) {
        requestHeaders.push({
          header: "Sec-Ch-Ua-Full-Version-List",
          // operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          value: heValues.fullVersionList.map((brand) => `"${brand.brand}";v="${brand.version}"`).join(", "),
        })
      }
      
      if (heValues.uaFullVersion) {
        requestHeaders.push({
          header: "Sec-Ch-Ua-Full-Version",
          // operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          value: heValues.uaFullVersion,
        })
      }
      console.log('set requestHeaders', requestHeaders)
    } catch (err) { }
  }

  // FIXME 直接修改http 或者 hook的时候修改
}

