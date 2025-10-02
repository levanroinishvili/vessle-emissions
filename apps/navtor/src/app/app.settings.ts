export const ENDPOINTS = {
    getVessels: 'https://frontendteamfiles.blob.core.windows.net/exercises/vessels.json',
    getEmissions: 'https://frontendteamfiles.blob.core.windows.net/exercises/emissions.json',
}

export const CONFIG = {
    /**
     * Simulate random delays and occasional errors for API endpoints
     * only during development and only in browser,
     * never in production or SSR
     */
    simulateLife: true,
}
