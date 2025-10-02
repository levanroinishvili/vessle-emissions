import { SeriesOptionsType } from "highcharts";
import { Emission } from "../models/emission.model";
import { EMISSION_SERIES_CONFIG } from "../app.settings";

export function shipEmissionsToSeries(emissions: Emission[], chartType: string): SeriesOptionsType[] {
    return EMISSION_SERIES_CONFIG.map(conf => ({
        ...conf.seriesOptions,
        type: chartType,
        data: emissions.map(datum => [datum.report_from_utc, datum[conf.emissionType]])
    } as SeriesOptionsType))
}
