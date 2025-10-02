import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, take, tap } from 'rxjs';
import { VesselsActions } from './vessels.actions';
import { selectVesselsData, selectVesselsStatus, selectVesselsError } from './vessels.reducer';
import { VesselService } from '../../services/vessel.service';


@Injectable({ providedIn: 'root' })
export class VesselsFacade {
    private store = inject(Store)
    private vesselService = inject(VesselService)


    // Observables
    data$ = this.store.select(selectVesselsData);
    status$ = this.store.select(selectVesselsStatus);
    error$ = this.store.select(selectVesselsError);

    load() {
        this.store.dispatch(VesselsActions.load());

        this.vesselService.allVessels$
            .pipe(
                take(1),
                tap((data) => this.store.dispatch(VesselsActions.loadSuccess({data}))),
                catchError((err) => {
                    const message = err?.message ?? 'Failed to load vessels';
                    this.store.dispatch(VesselsActions.loadFailure({error: message}));
                    return EMPTY;
                })
            )
            .subscribe();
    }
}
