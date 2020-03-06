import { createAction, props } from '@ngrx/store';
import { Settings } from 'src/app/models/settings.model';

export enum ESettingsActions {
    GetSettings = '[Settings] Get Settings',
    GetSettingsSuccess = '[Settings] Get Settings Success',
    UpdateSettings = '[Settings] Update Settings'
}

export const GetSettings = createAction(
   ESettingsActions.GetSettings
);

export const GetSettingsSuccess = createAction(
    ESettingsActions.GetSettingsSuccess,
    props<{_settings: Settings}>()
);

export const UpdateSettings = createAction(
    ESettingsActions.UpdateSettings,
    props<{_settings: Settings}>()
);