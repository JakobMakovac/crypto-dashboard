import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ECurrenciesActions, GetCurrenciesSuccess } from '../actions/currencies.actions';
import { switchMap, take } from 'rxjs/operators';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { Currency } from 'src/app/models/currency.model';
import { of } from 'rxjs';

@Injectable()
export class CurrenciesEffects {
    constructor(
        private _actions$: Actions,
        private _currenciesService: CurrenciesService
    ) { }

    @Effect()
    getCurrencies$ = this._actions$.pipe(
        ofType(ECurrenciesActions.GetCurrencies),
        switchMap(() => this._currenciesService.getCurrenciesList()),
        switchMap((currencyList: Currency[]) =>{
            return of(GetCurrenciesSuccess({_currencies: currencyList}));
        }),
        take(1)
    );
}