import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './store/effects/settings.effects';
import { CryptocurrenciesApiService } from './services/cryptocurrencies-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CurrenciesEffects } from './store/effects/currencies.effects';
import { CurrenciesService } from './services/currencies.service';
import { CurrencyAdapter } from './models/currency.model';
import { QuoteInfoAdapter } from './models/quote-info.model';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SettingsComponent,
        CurrencyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([SettingsEffects, CurrenciesEffects])
    ],
    providers: [
        CryptocurrenciesApiService,
        CurrenciesService,
        CurrencyAdapter,
        QuoteInfoAdapter
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
