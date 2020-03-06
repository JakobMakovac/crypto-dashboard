import { Component, OnInit } from '@angular/core';
import { CryptocurrenciesApiService } from 'src/app/services/cryptocurrencies-api.service';
import { map } from 'rxjs/operators';
import { Currency } from 'src/app/models/currency.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currencyList: Currency[];

    constructor(
        private _cryptoApiService: CryptocurrenciesApiService
    ) { }

    ngOnInit(): void {
    }

    fetchCurrencyList(): void {
        this._cryptoApiService.CryptocurrenciesList(10)
            .pipe(
                map((curList: Currency[]) => {
                    this.currencyList = curList;
                })
            )
            .subscribe();
    }
}
