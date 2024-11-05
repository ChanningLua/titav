declare enum RuntimeMsg {
  SetConfig = 'set-config',
  GetNotice = 'get-notice',
  SetHookRecords = 'set-hook-records',
  GetNewVersion = 'get-new-version',
}

declare enum ContentMsg {
  SetConfig = 'set-config',
  SetHookRecords = 'set-hook-records'
}

// **********
// RuntimeMsg
// **********
type SetConfigRequest = {
  type: RuntimeMsg.SetConfig,
  config: DeepPartial<LocalStorageConfig>,
}

type GetNoticeRequest = {
  type: RuntimeMsg.GetNotice,
  tabId: number,
  host: string,
}

type SetHookRecordsRequest = {
  type: RuntimeMsg.SetHookRecords,
  data: Partial<Record<string, number>>,
}



type GetNewVersionRequest = {
  type: RuntimeMsg.GetNewVersion,
}

type MsgRequest = SetConfigRequest | GetNoticeRequest | SetHookRecordsRequest  | GetNewVersionRequest

type RespFunc<T=any> = (msg: T) => void

type GetNoticeMsg = ToolbarNotice

type GetNewVersionMsg = string | undefined

// **********
// ContentMsg
// **********
type PostSetHookRecords = {
  type: ContentMsg.SetHookRecords,
  data: Partial<Record<string, number>>,
}

type PostSetConfig = {
  type: ContentMsg.SetConfig,
  config: DeepPartial<LocalStorageConfig>,
}

type ContentRequest = PostSetHookRecords | PostSetConfig 
