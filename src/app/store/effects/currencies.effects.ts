import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ECurrenciesActions, GetCurrenciesSuccess, RefreshCurrencySuccess } from '../actions/currencies.actions';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { Currency } from 'src/app/models/currency.model';
import { of } from 'rxjs';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { QuoteInfo } from 'src/app/models/quote-info.model';

@Injectable()
export class CurrenciesEffects {
    constructor(
        private _actions$: Actions,
        private _store$: Store<AppState>,
        private _currenciesService: CurrenciesService
    ) { }

    @Effect()
    getCurrencies$ = this._actions$.pipe(
        ofType(ECurrenciesActions.GetCurrencies),
        switchMap(() => this._currenciesService.getCurrenciesList()),
        switchMap((currencyList: Currency[]) =>{
            return of(GetCurrenciesSuccess({_currencies: currencyList}));
        })
    );

    @Effect()
    refreshCurrency$ = this._actions$.pipe(
        ofType(ECurrenciesActions.RefreshCurrency),
        withLatestFrom(this._store$),
        switchMap(([a, state]) => {
            return this._currenciesService.refreshQuotesForCurrency(
                state.currencies.selectedCurrencyId
            );
        }),
        switchMap((quotes: QuoteInfo[]) => {
            let quotesById = {};
            quotes.forEach((quote) => {
                quotesById[quote.quoteId] = quote;
            });

            return of(RefreshCurrencySuccess({_quotes: quotesById}));
        })
    );
}