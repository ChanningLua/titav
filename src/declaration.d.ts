declare const __VERSION__: string;

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'json!*' {
  const value: any;
  export default value;
}

type Platform = 'browser' | 'android' | 'ios';

type RouterMode = 'hash' | 'history' | 'abstract';

interface Window {
  $sentry: AnyObject;
  $appVersion: string | undefined;
  $systemVersion: string | undefined;
  $platform: Platform;
}

interface AnyObject {
  [propName: string]: any;
}

interface Dictionary<T> {
  [index: string]: T;
}

interface NumericDictionary<T> {
  [index: number]: T;
}
