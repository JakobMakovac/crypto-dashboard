import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { GetSettings, ESettingsActions } from '../actions/settings.actions';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SettingsEffects {
    constructor(
        private _actions$: Actions
    ) { }
}