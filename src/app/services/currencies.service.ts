import { Injectable } from "@angular/core";
import { CryptocurrenciesApiService } from './cryptocurrencies-api.service';
import { Observable, of } from 'rxjs';
import { Currency } from '../models/currency.model';
import { map } from 'rxjs/operators';
import { QuoteInfo } from '../models/quote-info.model';

@Injectable()
export class CurrenciesService {
    constructor(
        private _cryptocurrenciesApiService: CryptocurrenciesApiService
    ) { }

    getCurrenciesList(limit: number = 100, sortBy: string = 'market_cap'): Observable<Currency[]> {
        return this._cryptocurrenciesApiService.CryptocurrenciesList(limit, sortBy);
    }

    getQuoteForCurrency(currencyId: number[], convertId: number): Observable<QuoteInfo[]> {
        return this._cryptocurrenciesApiService.QuotesLatest(currencyId, convertId)
            .pipe(
                
            );
    }
}