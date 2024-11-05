import { postSetConfig, unwrapMessage } from './../../hook/message/content';
import { ContentMsg } from './../../hook/types/enum'

/**
 * 同页消息处理
 */
window.addEventListener('message', (ev) => {
  if(ev.origin != location.origin) return
  const msg = unwrapMessage(ev.data) as ContentRequest | undefined
  switch(msg?.type){
    case ContentMsg.SetHookRecords: {
      // msgSetHookRecords(msg.data)
      break
    }
  }
})

