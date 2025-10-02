/** After the Vessle data is merged with Emissions data */
export type { ShipEmissions } from '../services/emissions.service'

/** Raw API response, before the Vessle data is merged with Emissions data */
export interface IntervalEmissions<DATE = Date> {
    id: number
    timeSeries: Emission<DATE>[]
}

export interface Emission<DATE = Date> {
  report_from_utc: DATE
  report_to_utc: DATE
  co2_emissions: number
  sox_emissions: number
  nox_emissions: number
  pm_emissions: number
  ch4_emissions: number
}
