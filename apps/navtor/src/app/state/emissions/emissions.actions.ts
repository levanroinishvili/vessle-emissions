import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ShipEmissions } from '../../models/emission.model';


export const EmissionsActions = createActionGroup({
    source: 'Emissions',
    events: {
        'Load': emptyProps(),
        'Load Success': props<{ data: ShipEmissions[] }>(),
        'Load Failure': props<{ error: string }>()
    }
})
