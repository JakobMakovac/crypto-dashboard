import { initialSettingsState } from '../state/settings.state';
import { UpdateSettings, GetSettings } from '../actions/settings.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState = initialSettingsState

const _settingsReducer = createReducer(initialState,
    on(UpdateSettings, (initialState, {_settings}) => ({...initialState, settings: _settings})),
    on(GetSettings, initialState => initialState)
);

export function settingsReducer(state, action) {
    return _settingsReducer(state, action);
}