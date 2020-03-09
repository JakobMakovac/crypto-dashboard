import { AppState } from "../state/app.state";
import { createSelector } from '@ngrx/store';
import { CurrenciesState } from '../state/currencies.state';
import { Currency } from 'src/app/models/currency.model';
import { first } from 'lodash';

const selectCurrencies = (state: AppState) => state.currencies;

export const _selectCurrencies = createSelector(
    selectCurrencies, (state: CurrenciesState) => state.currencies
);

export const _selectCurrencyById = createSelector(
    selectCurrencies,
    (state: CurrenciesState) => first(state.currencies.filter((c: Currency) => {
        return c.id === state.selectedCurrencyId;
    }))
);
