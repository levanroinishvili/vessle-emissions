import { MonoTypeOperatorFunction, of, pipe, throwError, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

/** Simulates random difficulties, such as delays and errors that real-life APIs are susceptible to */
export function randomVicissitudes<T>({minDelay = 1000, maxDelay = 5000, errorChance = 0.3} = {}): MonoTypeOperatorFunction<T> {
    return pipe(
        switchMap(value => timer(Math.random() * (maxDelay - minDelay) + minDelay).pipe(
            switchMap(() => Math.random() < errorChance
                ? throwError(() => new Error('Something unexpected happened!'))
                : of(value)
            ),
        ))
    )
}
