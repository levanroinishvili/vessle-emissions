import { createFeature, createReducer, on } from '@ngrx/store';
import { VesselsActions } from './vessels.actions';
import { Vessel } from '../../models/vessel.model';


export type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error'


export interface VesselsState {
    data: Vessel[]
    status: LoadStatus
    error: string | null
}


const initialState: VesselsState = {
    data: [],
    status: 'idle',
    error: null,
}


const reducer = createReducer(
    initialState,
    on(VesselsActions.load, (state): VesselsState => ({...state, status: 'loading', error: null})),
    on(VesselsActions.loadSuccess, (state, { data }): VesselsState => ({...state, data, status: 'loaded'})),
    on(VesselsActions.loadFailure, (state, { error }): VesselsState => ({...state, status: 'error', error}))
)


export const vesselsFeature = createFeature({
    name: 'vessels',
    reducer
})


// Convenient re-exports of generated selectors
export const {
    selectVesselsState,
    selectData: selectVesselsData,
    selectStatus: selectVesselsStatus,
    selectError: selectVesselsError
} = vesselsFeature
