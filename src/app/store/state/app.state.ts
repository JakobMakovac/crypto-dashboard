import { SettingsState, initialSettingsState } from './settings.state';

export interface AppState {
    settings: SettingsState
}

export const initialAppState: AppState = {
    settings: initialSettingsState
}

export function getInitialState(): AppState {
    return initialAppState;
}