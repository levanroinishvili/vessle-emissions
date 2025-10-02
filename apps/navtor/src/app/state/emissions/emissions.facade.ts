import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, tap } from 'rxjs';
import { EmissionsActions } from './emissions.actions';
import { selectEmissionsData, selectEmissionsStatus, selectEmissionsError } from './emissions.reducer';
import { EmissionsService } from '../../services/emissions.service';


@Injectable({ providedIn: 'root' })
export class EmissionsFacade {
    private store = inject(Store)
    private emissionsService = inject(EmissionsService)


    data$ = this.store.select(selectEmissionsData)
    status$ = this.store.select(selectEmissionsStatus)
    error$ = this.store.select(selectEmissionsError)


    data = this.store.selectSignal(selectEmissionsData)
    status = this.store.selectSignal(selectEmissionsStatus)
    error = this.store.selectSignal(selectEmissionsError)


    load() {
        this.store.dispatch(EmissionsActions.load())

        this.emissionsService.allEmissions$
            .pipe(
                tap(data => this.store.dispatch(EmissionsActions.loadSuccess({data}))),
                catchError(err => {
                    const message = err?.message ?? 'Failed to load emissions'
                    this.store.dispatch(EmissionsActions.loadFailure({error: message}))
                    return EMPTY
                })
            )
            .subscribe();
    }
}
