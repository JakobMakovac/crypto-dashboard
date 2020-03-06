import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { GetSettings, UpdateSettings } from 'src/app/store/actions/settings.actions';
import { _selectSettings } from 'src/app/store/selectors/settings.selector';
import { Settings } from 'src/app/models/settings.model';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    settings$ = this._store.pipe(select(_selectSettings));

    constructor(
        private _store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this._store.dispatch(GetSettings());
    }

    changeCurrency(newCurrency: string) {
        let newSettings: Settings = {
            currency: newCurrency
        };

        this._store.dispatch(UpdateSettings({_settings: newSettings}));
    }
}
