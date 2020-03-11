import { createReducer, on } from "@ngrx/store";
import { initialCurrenciesState } from '../state/currencies.state';
import { GetCurrenciesSuccess, SetSelectedCurrency, RefreshCurrencySuccess } from '../actions/currencies.actions';
import { Currency } from 'src/app/models/currency.model';

export const initialState = initialCurrenciesState;

const _currenciesReducer = createReducer(initialState,
    on(GetCurrenciesSuccess, (initialState, {_currencies}) => ({...initialState, currencies: _currencies})),
    on(SetSelectedCurrency, (initialState, {id}) => ({... initialState, selectedCurrencyId: id})),
    on(RefreshCurrencySuccess, (initialState, {_quotes}) => ({
        ...initialState,
        currencies: initialState.currencies.map((item: Currency) => {
            if (item.id === initialState.selectedCurrencyId) {
                item.quotes = _quotes;
                return item;
            } else {
                return item;
            }
        })
    }))
);



export function currenciesReducer(state, action) {
    return _currenciesReducer(state, action);
};
