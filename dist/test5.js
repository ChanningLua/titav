var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return Object.propertyIsEnumerable.call(target, symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;

var HookType;
(function(HookType2) {
  HookType2[HookType2["default"] = 0] = "default";
  HookType2[HookType2["value"] = 1] = "value";
  HookType2[HookType2["page"] = 2] = "page";
  HookType2[HookType2["browser"] = 3] = "browser";
  HookType2[HookType2["domain"] = 4] = "domain";
  HookType2[HookType2["global"] = 5] = "global";
})(HookType || (HookType = {}));
var ContentMsg;
(function(ContentMsg2) {
  ContentMsg2["SetConfig"] = "set-config";
  ContentMsg2["SetHookRecords"] = "set-hook-records";
})(ContentMsg || (ContentMsg = {}));

const seededRandom = function(seed, max, min) {
  max = max ?? 1;
  min = min ?? 0;
  seed = (seed * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  return min + rnd * (max - min);
};
const seededEl = (arr, seed) => {
  return arr[seed % arr.length];
};
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const hardwareConcurrencys = [8, 12, 16];
const colorDepths = [16, 24, 32];
const pixelDepths = [16, 24, 32];
const webglRendererList = [
  "ANGLE (NVIDIA GeForce GTX 1050 Ti Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce GTX 1650 Direct3D9Ex vs_3_0 ps_3_0)",
  "ANGLE (Intel, Intel(R) UHD Graphics 630 (0x00003E9B) Direct3D11 vs_5_0 ps_5_0, D3D11)",
  "ANGLE (Intel(R) HD Graphics 630 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (Intel(R) HD Graphics 4400 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (Intel(R) HD Graphics 3000 Direct3D11 vs_4_1 ps_4_1)",
  "ANGLE (Intel(R) HD Graphics 4000 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce GTX 560 Ti Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce GTS 450 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce GTX 570 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce 210 Direct3D11 vs_4_1 ps_4_1)",
  "ANGLE (NVIDIA GeForce GTX 1060 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce GTX 750 Ti Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce GTX 960 Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (NVIDIA GeForce RTX 2070 SUPER Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (AMD Mobility Radeon HD 5000 Series Direct3D11 vs_5_0 ps_5_0)",
  "ANGLE (AMD Radeon(TM) R5 Graphics Direct3D11 vs_5_0 ps_5_0)"
];
const randomScreenSize = (seed) => {
  const offset = seed % 100 - 50;
  const rawWidth = screen.width;
  const rawHeight = screen.height;
  const width = rawWidth + offset;
  return {
    width,
    height: Math.round(width * rawHeight / rawWidth)
  };
};
const randomLanguage = (seed) => {
  return seededEl(navigator.languages, seed);
};
const randomHardwareConcurrency = (seed) => {
  return seededEl(hardwareConcurrencys, seed);
};
const randomColorDepth = (seed) => {
  return seededEl(colorDepths, seed);
};
const randomPixelDepth = (seed) => {
  return seededEl(pixelDepths, seed);
};
const randomCanvasNoise = (seed) => {
  let noise = "";
  for (let i = 0; i < 10; i++) {
    let index = Math.floor(seededRandom(seed++, 0, chars.length));
    noise += chars[index];
  }
  return noise;
};
const randomAudioNoise = (seed) => {
  return seededRandom(seed);
};
const randomWebglRander = (seed) => {
  return seededEl(webglRendererList, seed);
};
const randomWebglColor = (seed) => {
  const str = Array.from({ length: 4 }, (_, i) => seededRandom(seed + i, 0, 1).toFixed(2)).join(",");
  return `vec4(${str})`;
};

const debounce = function(func, wait) {
  wait = wait || 300;
  var timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
const debouncedAsync = function(func) {
  let promise;
  return function(...args) {
    if (promise) {
      return promise;
    }
    promise = func(...args).finally(() => promise = void 0);
    return promise;
  };
};

const IDENTIFY = "__MyFingerprint__";
const unwrapMessage = (msg) => {
  return msg[IDENTIFY];
};
const wrapMessage = (msg) => {
  return { [IDENTIFY]: msg };
};
const postSetHookRecords = (hookRecords) => {
  postMessage(wrapMessage({
    type: ContentMsg.SetHookRecords,
    data: hookRecords
  }), location.origin);
};

const genRandomSeed = function() {
  return Math.floor(Math.random() * Math.pow(2, 32));
};
const hashNumberFromString = (input) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    let char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash % 2147483647;
};
const urlToHttpHost = function(url) {
  try {
    let _url = new URL(url);
    if (_url.protocol !== "http:" && _url.protocol !== "https:") {
      return void 0;
    }
    let hostname = _url.hostname;
    let port = _url.port;
    if (port === "") {
      if (_url.protocol === "http:") {
        port = "80";
      } else if (_url.protocol === "https:") {
        port = "443";
      }
    }
    return `${hostname}:${port}`;
  } catch (err) {
    return void 0;
  }
};
const versionRandomOffset = (sourceVersion, seed, maxSubVersionNumber, maxMainVersionOffset, maxSubVersionOffset) => {
  const [mainVersion, ...subversions] = sourceVersion.split(".");
  if (mainVersion === void 0)
    return sourceVersion;
  let nMainVersion = Number(mainVersion);
  if (Number.isNaN(nMainVersion))
    return sourceVersion;
  maxMainVersionOffset = maxMainVersionOffset ?? 2;
  maxSubVersionOffset = maxSubVersionOffset ?? 50;
  maxSubVersionNumber = maxSubVersionNumber ?? subversions.length;
  nMainVersion += seed % (maxMainVersionOffset * 2 + 1) - maxMainVersionOffset;
  const nSubversions = [];
  for (let i = 0; i < maxSubVersionNumber; i++) {
    const subversion = subversions[i];
    let nSubversion = Number(subversion);
    if (Number.isNaN(nSubversion)) {
      nSubversions.push(subversion);
      continue;
    }
    const ss = Math.floor(seededRandom(seed + i, -maxSubVersionOffset, maxSubVersionOffset));
    nSubversion = Math.abs((nSubversion ?? 0) + ss);
    nSubversions.push(nSubversion.toString());
  }
  return [nMainVersion, ...nSubversions].join(".");
};
const getMainVersion = (sourceVersion) => {
  return sourceVersion.split(".")[0];
};

const uaRule = /^(?<product>.+?) \((?<systemInfo>.+?)\)( (?<engine>.+?))?( \((?<engineDetails>.+?)\))?( (?<extensions>.+?))?$/;
const firefoxUaRule = /^(?<product>.+?) \((?<systemInfo>.+?)\)( (?<engine>.+?))?( (?<extensions>.+?))?/;
class UAItem {
  name;
  version;
  constructor(name, version) {
    this.name = name;
    this.version = version;
  }
  static parse(item) {
    const parts = item.split("/");
    return new UAItem(parts[0], parts[1]);
  }
  toString() {
    return this.version ? `${this.name}/${this.version}` : this.name;
  }
  setName(name) {
    this.name = name;
  }
  setVersion(version) {
    this.version = version;
  }
}
class UAParser {
  type;
  product;
  systemInfo;
  engine;
  engineDetails;
  extensions;
  constructor(ua) {
    let groups;
    if (ua.includes("Firefox")) {
      this.type = "firefox";
      groups = ua.match(firefoxUaRule)?.groups;
    } else {
      this.type = "base";
      groups = ua.match(uaRule)?.groups;
    }
    if (!groups) {
      throw new Error("unable to parse");
    }
    this.product = UAItem.parse(groups.product);
    this.systemInfo = groups.systemInfo.split(";").map((item) => item.trim());
    this.engine = groups.engine?.split(" ").map((item) => UAItem.parse(item));
    this.engineDetails = groups.engineDetails?.split(",").map((item) => item.trim());
    this.extensions = groups.extensions?.split(" ").map((item) => UAItem.parse(item));
  }
  toString(ignoreProductName) {
    let product;
    if (ignoreProductName) {
      product = this.product.version;
    } else {
      product = this.product.toString();
    }
    const systemInfo = this.systemInfo.join("; ");
    const engine = this.engine?.map((item) => item.toString()).join(" ");
    const extensions = this.extensions?.map((item) => item.toString()).join(" ");
    if (this.type === "firefox") {
      return `${product} (${systemInfo}) ${engine} ${extensions}`;
    } else {
      const engineDetails = this.engineDetails?.join(", ");
      return `${product} (${systemInfo}) ${engine} (${engineDetails}) ${extensions}`;
    }
  }
}
class EquipmentInfoHandler {
  nav;
  seed;
  userAgent;
  appVersion;
  userAgentData;
  brands;
  fullVersionList;
  uaFullVersion;
  rawUserAgentData;
  rawToJSON;
  rawGetHighEntropyValues;
  constructor(nav, seed, isHook) {
    this.nav = nav;
    if (seed !== void 0) {
      this.setSeed(seed, isHook);
    }
  }
  setSeed(seed, isHook) {
    if (this.seed === seed)
      return;
    this.seed = seed;
    let uaParser;
    try {
      uaParser = new UAParser(this.nav.userAgent);
    } catch (err) {
      return;
    }
    if (uaParser.engine) {
      uaParser.engine.forEach((item) => {
        item.setVersion(versionRandomOffset(item.version, seed));
      });
      uaParser.extensions?.forEach((item) => {
        item.version && item.setVersion(versionRandomOffset(item.version, seed));
      });
    }
    this.userAgent = uaParser.toString();
    if (this.nav.appVersion) {
      this.appVersion = uaParser.toString(true);
    }
    if (this.nav.userAgentData) {
      if (!uaParser.extensions)
        return;
      this.rawUserAgentData = this.nav.userAgentData;
      const brands = this.rawUserAgentData.brands;
      this.brands = brands.map((brand) => ({ ...brand, version: getMainVersion(versionRandomOffset(brand.version, seed)) }));
      this.rawGetHighEntropyValues = NavigatorUAData.prototype.getHighEntropyValues;
      if (!isHook)
        return;
      this.userAgentData = new Proxy(this.rawUserAgentData, {
        get: (target, key) => {
          let res = null;
          switch (key) {
            case "brands": {
              res = this.brands;
              break;
            }
          }
          if (res === null) {
            res = target[key];
            if (typeof res === "function")
              return res.bind(target);
          }
          return res;
        }
      });
      if (NavigatorUAData?.prototype?.toJSON) {
        this.rawToJSON = NavigatorUAData.prototype.toJSON;
        NavigatorUAData.prototype.toJSON = new Proxy(NavigatorUAData.prototype.toJSON, {
          apply: (target, thisArg, args) => {
            const res = target.apply(thisArg, args);
            return { ...res, brands: this.brands };
          }
        });
      }
      if (NavigatorUAData?.prototype?.getHighEntropyValues) {
        NavigatorUAData.prototype.getHighEntropyValues = new Proxy(NavigatorUAData.prototype.getHighEntropyValues, {
          apply: (target, thisArg, args) => {
            const res = target.apply(thisArg, args);
            return res.then((data) => {
              if (data.brands?.length) {
                for (const brand of data.brands) {
                  brand.version = versionRandomOffset(brand.version, seed);
                }
              }
              if (data.fullVersionList?.length) {
                for (const brand of data.fullVersionList) {
                  brand.version = versionRandomOffset(brand.version, seed);
                }
              }
              if (data.uaFullVersion !== void 0) {
                data.uaFullVersion = versionRandomOffset(data.uaFullVersion, seed);
              }
              return data;
            });
          }
        });
      }
    }
  }
  getValue(key) {
    switch (key) {
      case "userAgent":
        return this.userAgent ?? null;
      case "appVersion":
        return this.appVersion ?? null;
      case "userAgentData":
        return this.userAgentData ?? null;
      default:
        return null;
    }
  }
  async getHighEntropyValues() {
    if (this.seed !== void 0 && this.rawGetHighEntropyValues && this.nav.userAgentData) {
      const data = await this.rawGetHighEntropyValues.apply(this.nav.userAgentData, [["fullVersionList", "uaFullVersion"]]);
      if (data.fullVersionList) {
        const fullVersionList = data.fullVersionList;
        for (const brand of fullVersionList) {
          brand.version = versionRandomOffset(brand.version, this.seed);
        }
        this.fullVersionList = fullVersionList;
      }
      if (data.uaFullVersion) {
        this.uaFullVersion = versionRandomOffset(data.uaFullVersion, this.seed);
      }
    }
    return {
      fullVersionList: this.fullVersionList,
      uaFullVersion: this.uaFullVersion
    };
  }
}

const hookTaskMap = {
  "iframe html hook": {
    onlyOnceEnable: true,
    condition: (fh) => fh.conf?.hookBlankIframe,
    onEnable: (fh) => {
      const observer = new MutationObserver((mutations) => {
        if (mutations.length == 1)
          return;
        for (var mutation of mutations) {
          for (var node of mutation["addedNodes"]) {
            if (node.nodeName === "IFRAME") {
              fh.hookIframe(node);
            }
          }
        }
      });
      observer.observe(fh.win.document.documentElement, { childList: true, subtree: true });
      const closeObserver = () => {
        observer.disconnect();
        fh.win.removeEventListener("DOMContentLoaded", closeObserver, { capture: true });
        fh.win.removeEventListener("load", closeObserver, { capture: true });
      };
      fh.win.addEventListener("DOMContentLoaded", closeObserver, { capture: true });
      fh.win.addEventListener("load", closeObserver, { capture: true });
    }
  },
  "iframe script hook": {
    condition: (fh) => fh.conf?.hookBlankIframe,
    onEnable: (fh) => {
      if (!fh.rawObjects.appendChild || !fh.rawObjects.insertBefore || !fh.rawObjects.replaceChild) {
        const apply = (target, thisArg, args) => {
          const res = target.apply(thisArg, args);
          const node = args[0];
          if (node?.tagName === "IFRAME") {
            fh.hookIframe(node);
          }
          return res;
        };
        if (!fh.rawObjects.appendChild) {
          fh.rawObjects.appendChild = fh.win.HTMLElement.prototype.appendChild;
          fh.win.HTMLElement.prototype.appendChild = new Proxy(fh.rawObjects.appendChild, { apply });
        }
        if (!fh.rawObjects.insertBefore) {
          fh.rawObjects.insertBefore = fh.win.HTMLElement.prototype.insertBefore;
          fh.win.HTMLElement.prototype.insertBefore = new Proxy(fh.rawObjects.insertBefore, { apply });
        }
        if (!fh.rawObjects.replaceChild) {
          fh.rawObjects.replaceChild = fh.win.HTMLElement.prototype.replaceChild;
          fh.win.HTMLElement.prototype.replaceChild = new Proxy(fh.rawObjects.replaceChild, { apply });
        }
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.appendChild) {
        fh.win.HTMLElement.prototype.appendChild = fh.rawObjects.appendChild;
        fh.rawObjects.appendChild = void 0;
      }
      if (fh.rawObjects.insertBefore) {
        fh.win.HTMLElement.prototype.insertBefore = fh.rawObjects.insertBefore;
        fh.rawObjects.insertBefore = void 0;
      }
      if (fh.rawObjects.replaceChild) {
        fh.win.HTMLElement.prototype.replaceChild = fh.rawObjects.replaceChild;
        fh.rawObjects.replaceChild = void 0;
      }
    }
  },
  "hook getOwnPropertyDescriptor": {
    onEnable: (fh) => {
      if (!fh.rawObjects.getOwnPropertyDescriptor) {
        fh.rawObjects.getOwnPropertyDescriptor = fh.win.Object.getOwnPropertyDescriptor;
        const navigatorDesc = fh.rawObjects.navigatorDescriptor ?? fh.win.Object.getOwnPropertyDescriptor(fh.win, "navigator");
        const screenDesc = fh.rawObjects.screenDescriptor ?? fh.win.Object.getOwnPropertyDescriptor(fh.win, "screen");
        fh.win.Object.getOwnPropertyDescriptor = new Proxy(fh.rawObjects.getOwnPropertyDescriptor, {
          apply: (target, thisArg, args) => {
            const [obj, prop] = args;
            if (obj === fh.win) {
              if (prop === "navigator")
                return navigatorDesc;
              if (prop === "screen")
                return screenDesc;
            }
            return target.apply(thisArg, args);
          }
        });
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.getOwnPropertyDescriptor) {
        fh.win.Object.getOwnPropertyDescriptor = fh.rawObjects.getOwnPropertyDescriptor;
        fh.rawObjects.getOwnPropertyDescriptor = void 0;
      }
    }
  },
  "hook navigator": {
    condition: (fh) => !fh.isAllDefault(fh.conf?.fingerprint?.navigator),
    onEnable: (fh) => {
      if (!fh.rawObjects.navigatorDescriptor) {
        fh.rawObjects.navigatorDescriptor = fh.win.Object.getOwnPropertyDescriptor(fh.win, "navigator");
        fh.win.Object.defineProperty(fh.win, "navigator", {
          value: new Proxy(fh.win.navigator, {
            get: (target, key) => {
              if (key in target) {
                let value;
                if (key === "userAgent" || key === "appVersion" || key === "userAgentData") {
                  const seed = fh.getSeedByHookValue(fh.conf?.fingerprint?.navigator?.equipment);
                  if (seed !== null) {
                    if (!fh.equipmentHandler) {
                      fh.equipmentHandler = new EquipmentInfoHandler(target, seed, true);
                    }
                    value = fh.equipmentHandler.getValue(key);
                    if (value !== null) {
                      recordAndSend(key);
                    }
                  } else {
                    value = null;
                  }
                } else {
                  value = fh.getValue("navigator", key);
                }
                if (value !== null) {
                  return value;
                }
                const res = target[key];
                if (typeof res === "function") {
                  return res.bind(target);
                } else {
                  return res;
                }
              } else {
                return void 0;
              }
            }
          })
        });
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.navigatorDescriptor) {
        fh.win.Object.defineProperty(fh.win, "navigator", fh.rawObjects.navigatorDescriptor);
        fh.rawObjects.navigatorDescriptor = void 0;
      }
    }
  },
  "hook screen": {
    condition: (fh) => !fh.isAllDefault(fh.conf?.fingerprint?.screen),
    onEnable: (fh) => {
      if (!fh.rawObjects.screenDescriptor) {
        fh.rawObjects.screenDescriptor = fh.win.Object.getOwnPropertyDescriptor(fh.win, "screen");
        fh.win.Object.defineProperty(fh.win, "screen", {
          value: new Proxy(fh.win.screen, {
            get: (target, key) => {
              if (key in target) {
                const value = fh.getValue("screen", key);
                if (value !== null) {
                  return value;
                }
                const res = target[key];
                if (typeof res === "function")
                  return res.bind(target);
                else
                  return res;
              } else {
                return void 0;
              }
            }
          })
        });
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.screenDescriptor) {
        fh.win.Object.defineProperty(fh.win, "screen", fh.rawObjects.screenDescriptor);
        fh.rawObjects.screenDescriptor = void 0;
      }
    }
  },
  "hook canvas": {
    condition: (fh) => fh.conf?.fingerprint?.other?.canvas?.type !== HookType.default,
    onEnable: (fh) => {
      if (!fh.rawObjects.toDataURL) {
        fh.rawObjects.toDataURL = fh.win.HTMLCanvasElement.prototype.toDataURL;
        fh.win.HTMLCanvasElement.prototype.toDataURL = new Proxy(fh.rawObjects.toDataURL, {
          apply: (target, thisArg, args) => {
            const value = fh.getValue("other", "canvas");
            if (value !== null) {
              let ctx = thisArg.getContext("2d");
              if (ctx !== null) {
                let style = ctx.fillStyle;
                ctx.fillStyle = "rgba(0, 0, 0, 0.01)";
                ctx.fillText(value, 0, 2);
                ctx.fillStyle = style;
              }
            }
            return target.apply(thisArg, args);
          }
        });
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.toDataURL) {
        fh.win.HTMLCanvasElement.prototype.toDataURL = fh.rawObjects.toDataURL;
        fh.rawObjects.toDataURL = void 0;
      }
    }
  },
  "hook audio": {
    condition: (fh) => fh.conf?.fingerprint?.other?.audio?.type !== HookType.default,
    onEnable: (fh) => {
      if (!fh.rawObjects.createDynamicsCompressor) {
        fh.rawObjects.createDynamicsCompressor = fh.win.OfflineAudioContext.prototype.createDynamicsCompressor;
        fh.win.OfflineAudioContext.prototype.createDynamicsCompressor = new Proxy(fh.rawObjects.createDynamicsCompressor, {
          apply: (target, thisArg, args) => {
            const value = fh.getValue("other", "audio");
            if (value === null)
              return target.apply(thisArg, args);
            const compressor = target.apply(thisArg, args);
            const gain = thisArg.createGain();
            gain.gain.value = value ?? Math.random() * 0.01;
            compressor.connect(gain);
            gain.connect(thisArg.destination);
            return compressor;
          }
        });
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.createDynamicsCompressor) {
        fh.win.OfflineAudioContext.prototype.createDynamicsCompressor = fh.rawObjects.createDynamicsCompressor;
        fh.rawObjects.createDynamicsCompressor = void 0;
      }
    }
  },
  "hook webgl": {
    condition: (fh) => fh.conf?.fingerprint?.other?.webgl?.type !== HookType.default,
    onEnable: (fh) => {
      if (!fh.rawObjects.wglGetParameter || !fh.rawObjects.wgl2GetParameter) {
        const UNMASKED_VENDOR_WEBGL = 37445;
        const UNMASKED_RENDERER_WEBGL = 37446;
        const getParameterApply = (target, thisArg, args) => {
          switch (args[0]) {
            case UNMASKED_RENDERER_WEBGL: {
              const value = fh.getValue("other", "webgl", "info");
              if (value === null)
                break;
              return value;
            }
            case UNMASKED_VENDOR_WEBGL: {
              return "Google Inc.";
            }
          }
          return target.apply(thisArg, args);
        };
        if (!fh.rawObjects.wglGetParameter) {
          fh.rawObjects.wglGetParameter = fh.win.WebGLRenderingContext.prototype.getParameter;
          fh.win.WebGLRenderingContext.prototype.getParameter = new Proxy(fh.rawObjects.wglGetParameter, { apply: getParameterApply });
        }
        if (!fh.rawObjects.wgl2GetParameter) {
          fh.rawObjects.wgl2GetParameter = fh.win.WebGL2RenderingContext.prototype.getParameter;
          fh.win.WebGL2RenderingContext.prototype.getParameter = new Proxy(fh.rawObjects.wgl2GetParameter, { apply: getParameterApply });
        }
      }
      if (!fh.rawObjects.wglShaderSource || !fh.rawObjects.wgl2ShaderSource) {
        const mainFuncRegx = /void\s+main\s*\(\s*(void)?\s*\)\s*\{[^}]*\}/;
        const shaderSourceApply = (target, thisArg, args) => {
          if (args[1]) {
            if (args[1].includes("gl_FragColor")) {
              const color = fh.getValue("other", "webgl", "color");
              if (color) {
                args[1] = args[1].replace(mainFuncRegx, `void main(){gl_FragColor=${color};}`);
              }
            } else if (args[1].includes("gl_Position")) {
              const color = fh.getValue("other", "webgl", "color");
              if (color) {
                args[1] = args[1].replace(mainFuncRegx, `void main(){gl_Position=${color};}`);
              }
            }
          }
          return target.apply(thisArg, args);
        };
        if (!fh.rawObjects.wglShaderSource) {
          fh.rawObjects.wglShaderSource = fh.win.WebGLRenderingContext.prototype.shaderSource;
          fh.win.WebGLRenderingContext.prototype.shaderSource = new Proxy(fh.rawObjects.wglShaderSource, { apply: shaderSourceApply });
        }
        if (!fh.rawObjects.wgl2ShaderSource) {
          fh.rawObjects.wgl2ShaderSource = fh.win.WebGL2RenderingContext.prototype.shaderSource;
          fh.win.WebGL2RenderingContext.prototype.shaderSource = new Proxy(fh.rawObjects.wgl2ShaderSource, { apply: shaderSourceApply });
        }
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.wglGetParameter) {
        fh.win.WebGLRenderingContext.prototype.getParameter = fh.rawObjects.wglGetParameter;
        fh.rawObjects.wglGetParameter = void 0;
      }
      if (fh.rawObjects.wgl2GetParameter) {
        fh.win.WebGL2RenderingContext.prototype.getParameter = fh.rawObjects.wgl2GetParameter;
        fh.rawObjects.wgl2GetParameter = void 0;
      }
      if (fh.rawObjects.wglShaderSource) {
        fh.win.WebGLRenderingContext.prototype.shaderSource = fh.rawObjects.wglShaderSource;
        fh.rawObjects.wglShaderSource = void 0;
      }
      if (fh.rawObjects.wgl2ShaderSource) {
        fh.win.WebGL2RenderingContext.prototype.shaderSource = fh.rawObjects.wgl2ShaderSource;
        fh.rawObjects.wgl2ShaderSource = void 0;
      }
    }
  },
  "hook timezone": {
    condition: (fh) => fh.conf?.fingerprint?.other?.timezone?.type !== HookType.default,
    onEnable: (fh) => {
      if (!fh.rawObjects.DateTimeFormat) {
        fh.rawObjects.DateTimeFormat = fh.win.Intl.DateTimeFormat;
        fh.win.Intl.DateTimeFormat = new Proxy(fh.rawObjects.DateTimeFormat, {
          construct: (target, args, newTarget) => {
            const currTimeZone = fh.getValue("other", "timezone");
            args[0] = args[0] ?? currTimeZone.locale;
            args[1] = Object.assign({ timeZone: currTimeZone.zone }, args[1]);
            return new target(...args);
          },
          apply: (target, thisArg, args) => {
            const currTimeZone = fh.getValue("other", "timezone");
            args[0] = args[0] ?? currTimeZone.locale;
            args[1] = Object.assign({ timeZone: currTimeZone.zone }, args[1]);
            return target.apply(thisArg, args);
          }
        });
      }
      if (!fh.rawObjects.getTimezoneOffset) {
        fh.rawObjects.getTimezoneOffset = fh.win.Date.prototype.getTimezoneOffset;
        fh.win.Date.prototype.getTimezoneOffset = new Proxy(fh.rawObjects.getTimezoneOffset, {
          apply: (target, thisArg, args) => {
            const currTimeZone = fh.getValue("other", "timezone");
            return currTimeZone.offset * -60;
          }
        });
      }
    },
    onDisable: (fh) => {
      if (fh.rawObjects.DateTimeFormat) {
        fh.win.Intl.DateTimeFormat = fh.rawObjects.DateTimeFormat;
        fh.rawObjects.DateTimeFormat = void 0;
      }
      if (fh.rawObjects.getTimezoneOffset) {
        fh.win.Date.prototype.getTimezoneOffset = fh.rawObjects.getTimezoneOffset;
        fh.rawObjects.getTimezoneOffset = void 0;
      }
    }
  },
  "hook webrtc": {
    condition: (fh) => fh.conf?.fingerprint?.other?.webrtc?.type !== HookType.default
  }
};
const hookTasks = Object.entries(hookTaskMap).map(([name, task]) => ({ ...task, name }));

const seedFuncMap = {
  "navigator.language": randomLanguage,
  "navigator.hardwareConcurrency": randomHardwareConcurrency,
  "screen.height": (seed) => randomScreenSize(seed).height,
  "screen.width": (seed) => randomScreenSize(seed).width,
  "screen.colorDepth": randomColorDepth,
  "screen.pixelDepth": randomPixelDepth,
  "other.canvas": randomCanvasNoise,
  "other.audio": randomAudioNoise,
  "other.webgl#info": randomWebglRander,
  "other.webgl#color": randomWebglColor,
  "other.webrtc": (seed) => {
  }
};
const valueFuncMap = {
  "other.timezone": (value) => value
};
const hookRecords = new Map();
const sendRecordMessage = debounce(() => {
  postSetHookRecords(Object.fromEntries(hookRecords));
});
const recordAndSend = function(key) {
  const oldValue = hookRecords.get(key) ?? 0;
  hookRecords.set(key, oldValue + 1);
  sendRecordMessage();
};
class FingerprintHandler {
  win;
  info;
  seed;
  conf;
  equipmentHandler;
  rawObjects = {};
  onlyRecord = {};
  constructor(win, info, config) {
    this.win = win;
    this.info = info;
    this.conf = config;
    this.seed = {
      page: seededRandom(info.tabId),
      domain: hashNumberFromString(info.host),
      browser: config.browserSeed ?? genRandomSeed(),
      global: config.customSeed ?? genRandomSeed()
    };
    if (!win)
      return;
    const key = "__MyFingerprint__" + info.tabId;
    if (!win[key]) {
      win[key] = true;
      this.listenMessage();
      this.refresh();
    }
  }
  listenMessage() {
    this.win.addEventListener("message", (ev) => {
      const msg = unwrapMessage(ev.data);
      switch (msg?.type) {
        case ContentMsg.SetConfig: {
          this.setConfig(msg.config);
          break;
        }
      }
    });
  }
  isEnable() {
    return !!this.conf.enable && !this.info.inWhitelist;
  }
  setConfig(config) {
    if (!config)
      return;
    if (this.conf) {
      this.conf = cjs(this.conf, config);
    } else {
      this.conf = config;
    }
    this.refresh();
  }
  refresh() {
    const enable = this.isEnable();
    for (const task of hookTasks) {
      if (enable && (!task.condition || task.condition(this) === true)) {
        if (task.onlyOnceEnable === true) {
          if (!this.onlyRecord[task.name]) {
            task.onEnable?.(this);
            this.onlyRecord[task.name] = true;
          }
        } else {
          task.onEnable?.(this);
        }
      } else {
        task.onDisable?.(this);
      }
    }
  }
  hookIframe(iframe) {
    new FingerprintHandler(iframe.contentWindow, this.info, this.conf);
  }
  isAllDefault(ops) {
    if (!ops)
      return true;
    for (const value of Object.values(ops)) {
      if (value.type !== HookType.default)
        return false;
    }
    return true;
  }
  getSeedByHookValue = (value) => {
    switch (value?.type) {
      case HookType.page: {
        return this.seed.page;
      }
      case HookType.domain: {
        return this.seed.domain;
      }
      case HookType.browser: {
        return this.seed.browser;
      }
      case HookType.global: {
        return this.seed.global;
      }
      case HookType.default:
      default:
        return null;
    }
  };
  getValue(prefix, key, opt) {
    const mode = this.conf.fingerprint?.[prefix]?.[key];
    if (!mode)
      return null;
    recordAndSend(key);
    const target = `${prefix}.${key}${opt ? "#" + opt : ""}`;
    const seedFunc = seedFuncMap[target];
    if (seedFunc) {
      if (mode.type === HookType.value)
        return null;
      const seed = this.getSeedByHookValue(mode);
      return seedFunc(seed);
    }
    const valueFunc = valueFuncMap[target];
    if (valueFunc) {
      if (mode.type !== HookType.value || mode.value === void 0)
        return null;
      return valueFunc(mode.value);
    }
    return null;
  }
}

const UA_NET_RULE_ID = 1;
var _local;
const genDefaultLocalStorage = () => {
  const defaultHook = { type: HookType.default };
  const browserHook = { type: HookType.global };
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
          hardwareConcurrency: defaultHook
        },
        screen: {
          height: defaultHook,
          width: defaultHook,
          colorDepth: defaultHook,
          pixelDepth: defaultHook
        },
        other: {
          timezone: defaultHook,
          canvas: browserHook,
          audio: browserHook,
          webgl: defaultHook,
          webrtc: defaultHook
        }
      },
      language: navigator.language,
      hookNetRequest: true,
      hookBlankIframe: true
    },
    whitelist: []
  };
};
const initLocalConfig = debouncedAsync(async () => {
  var storage = genDefaultLocalStorage();
  _local = { ...storage, whitelist: new Set(storage.whitelist) };
  refreshRequestHeaderUA();
  return _local;
});
const getLocalStorage = async () => {
  return await initLocalConfig();
};
async function refreshRequestHeaderUA() {
  let mode = _local.config.fingerprint.navigator.equipment;
  let seed;
  switch (mode.type) {
    case HookType.browser: {
      seed = _local.config.browserSeed;
      break;
    }
    case HookType.global: {
      seed = _local.config.customSeed;
      break;
    }
    default: {
      seed = void 0;
    }
  }
  if (seed) {
    try {
      const eh = new EquipmentInfoHandler(navigator, seed);
      var options = {
        removeRuleIds: [UA_NET_RULE_ID],
        addRules: []
      };
      var requestHeaders = [];
      if (eh.userAgent) {
        requestHeaders.push({
          header: "User-Agent",
          value: eh.userAgent
        });
      }
      if (eh.brands) {
        requestHeaders.push({
          header: "Sec-Ch-Ua",
          value: eh.brands.map((brand) => `"${brand.brand}";v="${brand.version}"`).join(", ")
        });
      }
      const heValues = await eh.getHighEntropyValues();
      if (heValues.fullVersionList) {
        requestHeaders.push({
          header: "Sec-Ch-Ua-Full-Version-List",
          value: heValues.fullVersionList.map((brand) => `"${brand.brand}";v="${brand.version}"`).join(", ")
        });
      }
      if (heValues.uaFullVersion) {
        requestHeaders.push({
          header: "Sec-Ch-Ua-Full-Version",
          value: heValues.uaFullVersion
        });
      }
      console.log("set requestHeaders", requestHeaders);
    } catch (err) {
    }
  }
}

console.log("xxx");
let tabId = Math.random() * 1e12 + 1;
let local = await getLocalStorage();
console.log("localStorage", localStorage);
let host = urlToHttpHost(location.href);
if (host) {
  new FingerprintHandler(window, {
    tabId,
    host,
    inWhitelist: false
  }, local.config);
  console.log("fp init");
} else {
  console.log("host error");
}
