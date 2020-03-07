import { createAction, props } from '@ngrx/store';
import { Settings } from 'src/app/models/settings.model';

export enum ESettingsActions {
    GetSettings = '[Settings] Get Settings',
    UpdateSettings = '[Settings] Update Settings'
}

export const GetSettings = createAction(
   ESettingsActions.GetSettings
);

export const UpdateSettings = createAction(
    ESettingsActions.UpdateSettings,
    props<{_settings: Settings}>()
);