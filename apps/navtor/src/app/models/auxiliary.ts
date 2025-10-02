/** Raw date as a string when reading from APIs */
export type DateString = '1970-01-01T00:00:00.000Z'

/** After processing API replies and converting date strings into JS Date object */
export type InjectDates<T extends object> = {
    [key in keyof T]: T[key] extends DateString ? Date : T[key] extends object ? InjectDates<T[key]> : T[key]
}
