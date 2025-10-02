import { MenuItem, SelectItem } from "primeng/api";
import { Emission } from "./models/emission.model";
import { SeriesOptionsType } from "highcharts";

export const ENDPOINTS = {
    getVessels: 'https://frontendteamfiles.blob.core.windows.net/exercises/vessels.json',
    getEmissions: 'https://frontendteamfiles.blob.core.windows.net/exercises/emissions.json',
}

export const BASE_CHART_OPTIONS: Highcharts.Options = {
    chart: {
        backgroundColor: '#111827',
    },
    // title: { text: 'MS Alpha Emissions' },
    xAxis: { type: 'datetime' },
    plotOptions: {
        series: {
            marker: { enabled: false },
            connectNulls: true,
        }
    },
    // series: []
}

export const MAIN_MENU: MenuItem[] = [
    {
        label: 'Vessels',
        routerLink: 'vessels',
    },
    {
        label: 'Emissions',
        routerLink: 'emissions',
    }
]

export const LIFE_SIMULATOR = {
    /**
     * Simulate random delays and occasional errors for API endpoints
     * only during development and only in browser,
     * never in production or SSR
     */
    simulateRealLife: true,

    /** Minimum delay of an API call */
    minDelay: 1000, // milliseconds

    /** Maximum delay of an API call */
    maxDelay: 2000, // milliseconds

    /** Probability of API calls returning an error */
    errorChance: 0.15,

}

export const CHART_TYPES: SelectItem[] = [
    {value: 'areaspline', label: 'Area Spline'},
    {value: 'line', label: 'Line'},
    {value: 'spline', label: 'Spline', disabled: true},
    {value: 'arcdiagram', label: 'Arc Diagram', disabled: true},
    {value: 'arearange', label: 'Area Range', disabled: true},
    {value: 'candlestick', label: 'Candlestick', disabled: true},
    {value: 'disparityindex', label: 'Disparity Index', disabled: true},
    {value: 'dumbbell', label: 'Dumbbell', disabled: true},
    {value: 'flowmap', label: 'Flow Map', disabled: true},
]

export const EMISSION_SERIES_CONFIG: { emissionType: keyof Emission, seriesOptions: Omit<SeriesOptionsType, 'type'> }[] = [
    { emissionType: 'co2_emissions', seriesOptions: { name: 'CO2' } },
    { emissionType: 'sox_emissions', seriesOptions: { name: 'SOx' } },
    { emissionType: 'nox_emissions', seriesOptions: { name: 'NOx' } },
    { emissionType: 'pm_emissions', seriesOptions: { name: 'PM' } },
    { emissionType: 'ch4_emissions', seriesOptions: { name: 'CH4' } },
]
