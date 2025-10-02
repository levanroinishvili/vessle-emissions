import { SeriesOptionsType } from "highcharts";
import { Emission } from "../models/emission.model";

const EMISSION_SERIES_CONFIG: { emissionType: keyof Emission, seriesOptions: SeriesOptionsType }[] = [
    { emissionType: 'co2_emissions', seriesOptions: { name: 'CO2', type: 'line' } },
    { emissionType: 'sox_emissions', seriesOptions: { name: 'SOx', type: 'line' } },
    { emissionType: 'nox_emissions', seriesOptions: { name: 'NOx', type: 'line' } },
    { emissionType: 'pm_emissions', seriesOptions: { name: 'PM', type: 'line' } },
    { emissionType: 'ch4_emissions', seriesOptions: { name: 'CH4', type: 'line' } },
]

export function shipEmissionsToSeries(emissions: Emission[]): SeriesOptionsType[] {
    return EMISSION_SERIES_CONFIG.map(conf => ({
        ...conf.seriesOptions,
        data: emissions.map(datum => [datum.report_from_utc, datum[conf.emissionType]])
    } as SeriesOptionsType))
}
