import { Settings } from 'src/app/models/settings.model';

export interface SettingsState{
    settings: Settings;
}

export const initialSettingsState: SettingsState = {
    settings: {
        currency: 'USD'
    }
};