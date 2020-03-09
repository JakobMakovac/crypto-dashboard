import { createAction, props } from '@ngrx/store';
import { Currency } from 'src/app/models/currency.model';
import { QuoteInfo } from 'src/app/models/quote-info.model';

export enum ECurrenciesActions {
    GetCurrencies = '[Currencies] Get Currencies',
    RefreshCurrency = '[Currencies] Refresh Currency',
    RefreshCurrencySuccess = '[Currencies] Refresh Currency Success',
    GetCurrenciesSuccess = '[Currencies] Get Currencies Success',
    GetSelectedCurrency = '[Currencies] Get Selected Currency',
    SetSelectedCurrency = '[Currencies] Set Selected Currency'
}

export enum ECurrencyActions {
    UpdateQuotes = '[Currency] Update Quotes'
}

export const UpdateQuotes = createAction(
    ECurrencyActions.UpdateQuotes,
    props<{_quotes: QuoteInfo[]}>()
);

export const GetCurrencies = createAction(
    ECurrenciesActions.GetCurrencies
);

export const RefreshCurrency = createAction(
    ECurrenciesActions.RefreshCurrency
);

export const GetSelectedCurrency = createAction(
    ECurrenciesActions.GetSelectedCurrency
);

export const SetSelectedCurrency = createAction(
    ECurrenciesActions.SetSelectedCurrency,
    props<{id: number}>()
)

export const GetCurrenciesSuccess = createAction(
    ECurrenciesActions.GetCurrenciesSuccess,
    props<{_currencies: Currency[]}>()
);

export const RefreshCurrencySuccess = createAction(
    ECurrenciesActions.RefreshCurrencySuccess,
    props<{_quotes: {[id: number]: QuoteInfo}}>()
)