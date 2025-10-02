export interface Vessel<DATE = Date> {
  id: number
  name: string
  mmsi: number
  imo: number
  companyId: number
  companyName: string
  startDate: DATE
  active: boolean
  vesselType: string
}
