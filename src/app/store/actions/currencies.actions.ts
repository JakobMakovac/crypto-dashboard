import { createAction, props } from '@ngrx/store';
import { Currency } from 'src/app/models/currency.model';

export enum ECurrenciesActions {
    GetCurrencies = '[Currencies] Get Currencies',
    GetCurrenciesSuccess = '[Currencies] Get Currencies Success'
}

export const GetCurrencies = createAction(
    ECurrenciesActions.GetCurrencies
);

export const GetCurrenciesSuccess = createAction(
    ECurrenciesActions.GetCurrenciesSuccess,
    props<{_currencies: Currency[]}>()
);