import { MenuItem } from "primeng/api";

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
