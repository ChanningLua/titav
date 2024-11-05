var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var bridge = {
  default: commonjsGlobal,
  call: function(method, args, cb) {
    var ret = "";
    if (typeof args == "function") {
      cb = args;
      args = {};
    }
    var arg = { data: args === void 0 ? null : args };
    if (typeof cb == "function") {
      var cbName = "dscb" + window.dscb++;
      window[cbName] = cb;
      arg["_dscbstub"] = cbName;
    }
    arg = JSON.stringify(arg);
    if (window._dsbridge) {
      ret = _dsbridge.call(method, arg);
    } else if (window._dswk || navigator.userAgent.indexOf("_dsbridge") != -1) {
      ret = prompt("_dsbridge=" + method, arg);
    }
    return JSON.parse(ret || "{}").data;
  },
  register: function(name, fun, asyn) {
    var q = asyn ? window._dsaf : window._dsf;
    if (!window._dsInit) {
      window._dsInit = true;
      setTimeout(function() {
        bridge.call("_dsb.dsinit");
      }, 0);
    }
    if (typeof fun == "object") {
      q._obs[name] = fun;
    } else {
      q[name] = fun;
    }
  },
  registerAsyn: function(name, fun) {
    this.register(name, fun, true);
  },
  hasNativeMethod: function(name, type) {
    return this.call("_dsb.hasNativeMethod", { name, type: type || "all" });
  },
  disableJavascriptDialogBlock: function(disable) {
    this.call("_dsb.disableJavascriptDialogBlock", {
      disable: disable !== false
    });
  }
};
!function() {
  if (window._dsf)
    return;
  var ob = {
    _dsf: {
      _obs: {}
    },
    _dsaf: {
      _obs: {}
    },
    dscb: 0,
    dsBridge: bridge,
    close: function() {
      bridge.call("_dsb.closePage");
    },
    _handleMessageFromNative: function(info) {
      var arg = JSON.parse(info.data);
      var ret = {
        id: info.callbackId,
        complete: true
      };
      var f = this._dsf[info.method];
      var af = this._dsaf[info.method];
      var callSyn = function(f2, ob3) {
        ret.data = f2.apply(ob3, arg);
        bridge.call("_dsb.returnValue", ret);
      };
      var callAsyn = function(f2, ob3) {
        arg.push(function(data, complete) {
          ret.data = data;
          ret.complete = complete !== false;
          bridge.call("_dsb.returnValue", ret);
        });
        f2.apply(ob3, arg);
      };
      if (f) {
        callSyn(f, this._dsf);
      } else if (af) {
        callAsyn(af, this._dsaf);
      } else {
        var name = info.method.split(".");
        if (name.length < 2)
          return;
        var method = name.pop();
        var namespace = name.join(".");
        var obs = this._dsf._obs;
        var ob2 = obs[namespace] || {};
        var m = ob2[method];
        if (m && typeof m == "function") {
          callSyn(m, ob2);
          return;
        }
        obs = this._dsaf._obs;
        ob2 = obs[namespace] || {};
        m = ob2[method];
        if (m && typeof m == "function") {
          callAsyn(m, ob2);
          return;
        }
      }
    }
  };
  for (var attr in ob) {
    window[attr] = ob[attr];
  }
  bridge.register("_hasJavascriptMethod", function(method, tag) {
    var name = method.split(".");
    if (name.length < 2) {
      return !!(_dsf[name] || _dsaf[name]);
    } else {
      var method = name.pop();
      var namespace = name.join(".");
      var ob2 = _dsf._obs[namespace] || _dsaf._obs[namespace];
      return ob2 && !!ob2[method];
    }
  });
}();
var dsbridge = bridge;
const semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
const validateAndParse = (version) => {
  if (typeof version !== "string") {
    throw new TypeError("Invalid argument expected string");
  }
  const match = version.match(semver);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version}' received)`);
  }
  match.shift();
  return match;
};
const isWildcard = (s) => s === "*" || s === "x" || s === "X";
const tryParse = (v) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
const forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
const compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b))
    return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp)
    return 1;
  if (ap < bp)
    return -1;
  return 0;
};
const compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || "0", b[i] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};
const compareVersions = (v1, v2) => {
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);
  const p1 = n1.pop();
  const p2 = n2.pop();
  const r = compareSegments(n1, n2);
  if (r !== 0)
    return r;
  if (p1 && p2) {
    return compareSegments(p1.split("."), p2.split("."));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};
var __defProp$1 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _ObjectPool = class {
  constructor() {
    __publicField(this, "_objs");
    this._objs = new Array();
  }
  pushObj(obj) {
    this._objs.push(obj);
  }
  popObj() {
    if (this._objs.length > 0) {
      return this._objs.pop();
    } else {
      return null;
    }
  }
  clear() {
    while (this._objs.length > 0) {
      this._objs.pop();
    }
  }
  pop(ref) {
    if (!_ObjectPool._content[ref]) {
      _ObjectPool._content[ref] = [];
    }
    var list = _ObjectPool._content[ref];
    if (list.length) {
      return list.pop();
    } else {
      return new ref();
    }
  }
  push(obj) {
    if (obj == null) {
      return false;
    }
    var ref = obj.constructor;
    if (!_ObjectPool._content[ref]) {
      return false;
    }
    _ObjectPool._content[ref].push(obj);
    return true;
  }
  clearAll() {
    _ObjectPool._content = {};
  }
  clearClass(ref, clearFuncName = null) {
    var list = _ObjectPool._content[ref];
    while (list && list.length) {
      var obj = list.pop();
      if (clearFuncName) {
        obj[clearFuncName]();
      }
      obj = null;
    }
    _ObjectPool._content[ref] = null;
    delete _ObjectPool._content[ref];
  }
  dealFunc(ref, dealFuncName) {
    var list = _ObjectPool._content[ref];
    if (list == null) {
      return;
    }
    var i = 0;
    var len = list.length;
    for (i; i < len; i++) {
      list[i][dealFuncName]();
    }
  }
};
let ObjectPool = _ObjectPool;
__publicField(ObjectPool, "_content", {});
var objectPool = new ObjectPool();
class MessageCenter {
  constructor() {
    __publicField(this, "dict");
    __publicField(this, "eVec");
    __publicField(this, "lastRunTime");
    this.dict = {};
    this.eVec = new Array();
    this.lastRunTime = 0;
  }
  listen(type, listener, listenerObj) {
    var arr = this.dict[type];
    if (arr == null) {
      arr = new Array();
      this.dict[type] = arr;
    }
    var i = 0;
    var len = arr.length;
    for (i; i < len; i++) {
      if (arr[i][0] == listener && arr[i][1] == listenerObj) {
        return;
      }
    }
    arr.push([listener, listenerObj]);
  }
  unlisten(type, listener, listenerObj) {
    var arr = this.dict[type];
    if (arr == null) {
      return;
    }
    var i = 0;
    var len = arr.length;
    for (i; i < len; i++) {
      if (arr[i][0] == listener && arr[i][1] == listenerObj) {
        arr.splice(i, 1);
        break;
      }
    }
    if (arr.length == 0) {
      this.dict[type] = null;
      delete this.dict[type];
    }
  }
  dispatch(type, ...param) {
    if (this.dict[type] == null) {
      return;
    }
    var vo = objectPool.pop(MessageVo);
    vo.type = type;
    vo.param = param;
    this.eVec.push(vo);
  }
  run() {
    var currTime = new Date().getTime();
    var inSleep = currTime - this.lastRunTime > 100;
    this.lastRunTime = currTime;
    if (inSleep) {
      while (this.eVec.length > 0) {
        this.dealMsg(this.eVec.shift());
      }
    } else {
      while (this.eVec.length > 0) {
        this.dealMsg(this.eVec.shift());
        if (new Date().getTime() - currTime > 5) {
          break;
        }
      }
    }
  }
  dealMsg(msgVo) {
    var listeners = this.dict[msgVo.type];
    var i = 0;
    var len = listeners.length;
    var listener = null;
    while (i < len) {
      listener = listeners[i];
      listener[0].apply(listener[1], msgVo.param);
      i++;
    }
    msgVo.dispose();
    objectPool.push(msgVo);
  }
}
class MessageVo {
  constructor() {
    __publicField(this, "type");
    __publicField(this, "param");
  }
  dispose() {
    this.type = null;
    this.param = null;
  }
}
const messageCenter = new MessageCenter();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
class ExternalNavigator {
  constructor() {
    this.nativeCallJs();
    console.log("\u521D\u59CB\u5316 external");
    messageCenter.listen("callNative", this.jsCallNative, this);
  }
  nativeCallJs() {
    dsbridge.register("nativeCallJs", (result) => {
      messageCenter.dispatch(result.key, result.data);
    });
  }
  jsCallNative(params, onSuccess) {
    const cb = async (resultParams) => {
      await onSuccess(resultParams);
    };
    dsbridge.call("jsCallNative", params, cb);
  }
  sendErrorInfo(errorMsg, methodName, params) {
  }
}
__decorateClass([
  limit(["android", "ios"], "1.0.1")
], ExternalNavigator.prototype, "jsCallNative", 1);
function limit(platforms = ["android", "ios"], version = "1.0.0") {
  return (target, name, descriptor) => {
    if (!platforms.includes(window.$platform)) {
      descriptor.value = () => {
        console.log(`\u5F53\u524D\u5904\u5728 ${window.$platform} \u73AF\u5883\uFF0C\u65E0\u6CD5\u8C03\u7528\u63A5\u53E3\u54E6`);
      };
      return descriptor;
    }
    if (window.$appVersion && compareVersions.compare(version, window.$appVersion, ">")) {
      descriptor.value = () => {
        console.log(`\u5F53\u524D\u5BA2\u6237\u7AEF\u7248\u672C\u8FC7\u4F4E\uFF0C\u8BF7\u5347\u7EA7\u5230 ${version} \u4EE5\u4E0A\u7248\u672C`);
      };
      return descriptor;
    }
  };
}
const nativeExternal = new ExternalNavigator();
export { nativeExternal };
