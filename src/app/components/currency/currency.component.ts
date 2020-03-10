import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { _selectCurrencyById } from 'src/app/store/selectors/currencies.selector';
import { Router, NavigationStart } from '@angular/router';
import { last } from 'lodash';
import { tap, filter } from 'rxjs/operators';
import { SetSelectedCurrency, RefreshCurrency } from 'src/app/store/actions/currencies.actions';
import { Subscription } from 'rxjs';
import { Settings } from 'src/app/models/settings.model';
import { _selectSettings } from 'src/app/store/selectors/settings.selector';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
    // selectors
    currency$ = this._store.pipe(select(_selectCurrencyById));
    settings$ = this._store.pipe(select(_selectSettings));

    // state
    currencyId: number;
    currentSettings: Settings;

    // subs
    settingsChangedSub: Subscription;
    routerSub: Subscription;

    constructor(
        private _store: Store<AppState>,
        private _router: Router
    ) {
        this.setCurrencyId(this._router.url);
    }

    ngOnInit(): void {
        this.subscribeToRouterEvents();
        this.subscribeToSettingsChanged();
    }

    refreshCurrency() {
        this._store.dispatch(RefreshCurrency());
    }

    private setCurrencyId(newUrl: string) {
        this.currencyId = parseInt(last(newUrl.split('/')));
        this._store.dispatch(SetSelectedCurrency({id: this.currencyId}));
    }

    private subscribeToRouterEvents() {
        this.routerSub =  this._router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                tap((event: any) => {
                    this.setCurrencyId(event.url);
                })
            )
            .subscribe();
    }

    private subscribeToSettingsChanged() {
        this.settingsChangedSub = this.settings$
            .pipe(
                tap((updatedSettings: Settings) => {
                    this.currentSettings = updatedSettings;
                })
            )
            .subscribe();
    }

    close() {
        this._router.navigate(['/home']);
    }

    ngOnDestroy() {
        this.routerSub && this.routerSub.unsubscribe();
        this.settingsChangedSub && this.settingsChangedSub.unsubscribe();
    }
}
