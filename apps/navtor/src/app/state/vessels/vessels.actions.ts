import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Vessel } from '../../models/vessel.model';


export const VesselsActions = createActionGroup({
    source: 'Vessels',
    events: {
        'Load': emptyProps(),
        'Load Success': props<{ data: Vessel[] }>(),
        'Load Failure': props<{ error: string }>()
    }
})
