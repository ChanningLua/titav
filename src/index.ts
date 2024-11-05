import { FingerprintHandler } from "./hook/core/core";
import { urlToHttpHost } from "./utils/base";
import { getLocalStorage } from './hook/background/index';
console.log('xxx')


let tabId: number = Math.random() *  1000000000000 + 1;
let local: LocalStorage = await getLocalStorage();

console.log('localStorage', localStorage)
let host = urlToHttpHost(location.href)
if(host){
  var fp = new FingerprintHandler(window, {
    tabId,
    host,
    inWhitelist: false
  }, local.config)
  
  console.log('fp init')
} else {
  console.log('host error')
}


  