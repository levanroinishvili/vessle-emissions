import { createFeature, createReducer, on } from '@ngrx/store';
import { EmissionsActions } from './emissions.actions';
import { ShipEmissions } from '../../models/emission.model';


export type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error'


export interface EmissionsState {
    data: ShipEmissions[]
    status: LoadStatus
    error: string | null
}

const initialState: EmissionsState = {
    data: [],
    status: 'idle',
    error: null,
}

const reducer = createReducer(
    initialState,
    on(EmissionsActions.load, (state): EmissionsState => ({ ...state, status: 'loading', error: null })),
    on(EmissionsActions.loadSuccess, (state, { data }): EmissionsState => ({ ...state, data, status: 'loaded' })),
    on(EmissionsActions.loadFailure, (state, { error }): EmissionsState => ({ ...state, status: 'error', error }))
)

export const emissionsFeature = createFeature({
    name: 'emissions',
    reducer
})

export const {
    selectEmissionsState,
    selectData: selectEmissionsData,
    selectStatus: selectEmissionsStatus,
    selectError: selectEmissionsError
} = emissionsFeature
