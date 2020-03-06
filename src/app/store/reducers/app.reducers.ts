import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { settingsReducer } from './settings.reducer';

export const appReducers: ActionReducerMap<AppState, any> = {
    settings: settingsReducer
}