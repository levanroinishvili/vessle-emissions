import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IntervalEmissions } from '../../models/emission.model';


export const EmissionsActions = createActionGroup({
    source: 'Emissions',
    events: {
        'Load': emptyProps(),
        'Load Success': props<{ data: IntervalEmissions[] }>(),
        'Load Failure': props<{ error: string }>()
    }
})
