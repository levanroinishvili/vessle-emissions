import { MonoTypeOperatorFunction, of, pipe, throwError, timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LIFE_SIMULATOR } from "../../app.settings";

/** Simulates random difficulties, such as delays and errors that real-life APIs are susceptible to */
export function randomVicissitudes<T>({
    minDelay = LIFE_SIMULATOR.minDelay,
    maxDelay = LIFE_SIMULATOR.maxDelay,
    errorChance = LIFE_SIMULATOR.errorChance
} = {}): MonoTypeOperatorFunction<T> {
    return pipe(
        switchMap(value => timer(Math.random() * (maxDelay - minDelay) + minDelay).pipe(
            switchMap(() => Math.random() < errorChance
                ? throwError(() => new Error('Something unexpected happened!'))
                : of(value)
            ),
        ))
    )
}
