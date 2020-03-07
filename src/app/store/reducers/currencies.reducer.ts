import { createReducer, on } from "@ngrx/store";
import { initialCurrenciesState } from '../state/currencies.state';
import { GetCurrenciesSuccess } from '../actions/currencies.actions';

export const initialState = initialCurrenciesState;

const _currenciesReducer = createReducer(initialState,
    on(GetCurrenciesSuccess, (initialState, {_currencies}) => ({...initialState, currencies: _currencies}))
);

export function currenciesReducer(state, action) {
    return _currenciesReducer(state, action);
};
