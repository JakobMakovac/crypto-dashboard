import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { _selectCurrencyById } from 'src/app/store/selectors/currencies.selector';
import { Router, NavigationStart } from '@angular/router';
import { last } from 'lodash';
import { tap, filter } from 'rxjs/operators';
import { SetSelectedCurrency, RefreshCurrency } from 'src/app/store/actions/currencies.actions';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
    currencyId: number;
    currency$ = this._store.pipe(select(_selectCurrencyById));

    constructor(
        private _store: Store<AppState>,
        private _router: Router
    ) {
        this.setCurrencyId(this._router.url);
    }

    ngOnInit(): void {
        this.currency$
            .pipe(
                tap((c) => {
                    console.log(c);
                })
            )
            .subscribe();

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                tap((event: any) => {
                    console.log(event);
                    this.setCurrencyId(event.url);
                })
            )
            .subscribe();
    }

    refreshCurrency() {
        this._store.dispatch(RefreshCurrency());
    }

    private setCurrencyId(newUrl: string) {
        this.currencyId = parseInt(last(newUrl.split('/')));
        this._store.dispatch(SetSelectedCurrency({id: this.currencyId}));
    }
}
