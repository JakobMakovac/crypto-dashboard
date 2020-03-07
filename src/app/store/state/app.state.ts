import { SettingsState, initialSettingsState } from './settings.state';
import { initialCurrenciesState, CurrenciesState } from './currencies.state';

export interface AppState {
    settings: SettingsState,
    currencies: CurrenciesState
}

export const initialAppState: AppState = {
    settings: initialSettingsState,
    currencies: initialCurrenciesState
}

export function getInitialState(): AppState {
    return initialAppState;
}