import { AppState } from "../state/app.state";
import { createSelector } from '@ngrx/store';
import { CurrenciesState } from '../state/currencies.state';

const selectCurrencies = (state: AppState) => state.currencies;

export const _selectCurrencies = createSelector(
    selectCurrencies, (state: CurrenciesState) => state.currencies
);
