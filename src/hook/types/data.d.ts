
type ToolbarNoticeRecord = {
  type: 'record'
  data?: Partial<Record<string, number>>
}

type ToolbarNotice = ToolbarNoticeRecord

type SizeInfo = {
  width: number
  height: number
}

type TimeZoneInfo = {
  text: string
  offset: number
  zone: string
  locale: string
}

type EquipmentInfo = {
  platform: string
  appVersion: string
  userAgent: string
}