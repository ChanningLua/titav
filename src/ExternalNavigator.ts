import dsbridge from 'dsbridge';
import { compareVersions }  from 'compare-versions';
// import NATIVE_ERROR_CODE_MAP from './constants/ErrorCode';
import { messageCenter } from 'message-core';
// npm i compare-versions

export interface SyncExternalParams {
  key: number;
  data: Object;
}

interface IExternalNavigator {
  jsCallNative(params: SyncExternalParams, onSuccess: () => void): void;
  nativeCallJs(): void
}

class ExternalNavigator implements IExternalNavigator {

  constructor() {
    this.nativeCallJs();
    console.log('初始化 external');
    messageCenter.listen('callNative', this.jsCallNative, this);
  }

  public nativeCallJs () {
    dsbridge.register('nativeCallJs', (result: SyncExternalParams) => {
      messageCenter.dispatch(result.key, result.data);
    });
  }

  @limit(['android', 'ios'], '1.0.1')
  public jsCallNative(params: SyncExternalParams, onSuccess: (resultParams: SyncExternalParams) => void): void {
    const cb = async (resultParams: SyncExternalParams) => {
      // const msg = NATIVE_ERROR_CODE_MAP[errCode];

      // if (errCode !== 200) {
      //   this.sendErrorInfo('errorCode', 'syncExternal', params);
      // } else {
        await onSuccess(resultParams);
      // }
    };

    dsbridge.call('jsCallNative', params, cb);
  }

  private sendErrorInfo(errorMsg: string, methodName: string, params: any) {
    // 调用错误日志
    
  }
}

/**
 * 限制接口调用的平台和客户端版本
 * 实际情况中多个平台客户端版本不一致，可以根据项目需求对下面的函数做修改
 * @param {string} [platforms=['android', 'ios']]
 * @param {string} [version='1.0.0']
 * @returns
 */
function limit(platforms = ['android', 'ios'], version = '1.0.0') {
  return (target: AnyObject, name: string, descriptor: PropertyDescriptor) => {
    if (!platforms.includes(window.$platform)) {
      descriptor.value = () => {
        // TODO 阻止调用
        console.log(`当前处在 ${window.$platform} 环境，无法调用接口哦`)
      };

      return descriptor;
    }

    if (
      window.$appVersion &&
      compareVersions.compare(version, window.$appVersion, '>')
    ) {
      descriptor.value = () => {
        // TODO 阻止调用
        console.log(`当前客户端版本过低，请升级到 ${version} 以上版本`)
      };

      return descriptor;
    }
  };
}


export const nativeExternal = new ExternalNavigator()