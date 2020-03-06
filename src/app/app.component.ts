import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/state/app.state';
import { _selectSettings } from './store/selectors/settings.selector';
import { GetSettings } from './store/actions/settings.actions';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'crypto-dashboard';
    settings$ = this._store.pipe(select(_selectSettings));

    constructor(
        private _store: Store<AppState>
    ) { }

    ngOnInit() {
        this._store.dispatch(GetSettings());
    }
}
