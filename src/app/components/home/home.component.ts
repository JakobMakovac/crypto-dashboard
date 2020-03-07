import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Currency } from 'src/app/models/currency.model';
import { Settings } from 'src/app/models/settings.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { _selectSettings } from 'src/app/store/selectors/settings.selector';
import { Subscription } from 'rxjs';
import { _selectCurrencies } from 'src/app/store/selectors/currencies.selector';
import { GetCurrencies } from 'src/app/store/actions/currencies.actions';
import { QuoteInfo } from 'src/app/models/quote-info.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    settings$ = this._store.pipe(select(_selectSettings));
    currencies$ = this._store.pipe(select(_selectCurrencies));
    currencyList: Currency[];
    currentSettings: Settings;

    settingsChangedSub: Subscription;

    constructor(
        private _store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.subscribeToSettingsChanged();
        this.triggerCurrenciesLoad();
    }

    private subscribeToSettingsChanged() {
        if (this.settingsChangedSub) {
            this.settingsChangedSub.unsubscribe();
        }
        this.settingsChangedSub = this.settings$
            .pipe(
                tap((updatedSettings: Settings) => {
                    this.currentSettings = updatedSettings;
                })
            )
            .subscribe();
    }

    triggerCurrenciesLoad() {
        this._store.dispatch(GetCurrencies());
    }

    ngOnDestroy() {
        this.settingsChangedSub.unsubscribe();
    }
}
