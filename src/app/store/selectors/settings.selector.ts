import { AppState } from "../state/app.state";
import { createSelector } from '@ngrx/store';
import { SettingsState } from '../state/settings.state';

const selectSettings = (state: AppState) => state.settings;

export const _selectSettings = createSelector(
    selectSettings, (state: SettingsState) => state.settings
);