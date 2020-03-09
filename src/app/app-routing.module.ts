import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CurrencyComponent } from './components/currency/currency.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        children: [
            {
                path: '',
                outlet: 'sidebar',
                component: HomeComponent
            },
            {
                path: ':currencyId',
                component: CurrencyComponent
            }
        ]
    },
    {
        path: 'settings',
        children: [
            {
                path: '',
                outlet: 'sidebar',
                component: SettingsComponent   
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
