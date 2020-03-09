import { Injectable } from "@angular/core";
import { CryptocurrenciesApiService } from './cryptocurrencies-api.service';
import { Observable, from, of } from 'rxjs';
import { Currency } from '../models/currency.model';
import { flatMap, toArray, map } from 'rxjs/operators';
import { QuoteInfo } from '../models/quote-info.model';
import _ from 'lodash';

@Injectable()
export class CurrenciesService {
    constructor(
        private _cryptocurrenciesApiService: CryptocurrenciesApiService
    ) { }

    getCurrenciesList(limit: number = 100, sortBy: string = 'market_cap'): Observable<Currency[]> {
        let currencyList: Currency[];
        return this._cryptocurrenciesApiService.CryptocurrenciesList(limit, sortBy)
            .pipe(
                flatMap((curList: Currency[]) => {
                    currencyList = curList;
                    return from([1, 2781, 2787, 2790]);
                }),
                flatMap((convertId: number) => {
                    let ids = currencyList.map(item => item.id);
                    return this.getQuoteForCurrency(ids, convertId);
                }),
                flatMap((quotes: QuoteInfo[]) => {
                    return this.mapQuotesToCurrencies(currencyList, quotes);
                })
            );
    }

    getQuoteForCurrency(currencyId: number[], convertId: number): Observable<QuoteInfo[]> {
        return this._cryptocurrenciesApiService.QuotesLatest(currencyId, convertId);
    }

    refreshQuotesForCurrency(currencyId: number): Observable<QuoteInfo[]> {
        return from([1, 2781, 2787, 2790])
            .pipe(
                flatMap((_convertId: number) => {
                    return this.getQuoteForCurrency([currencyId], _convertId);
                }),
                flatMap((quote: QuoteInfo[]) => {
                    return quote;
                }),
                toArray()
            );
    }

    private mapQuotesToCurrencies(currencyList: Currency[], quotes: QuoteInfo[]): Observable<Currency[]> {
        let cursByParentId = _.groupBy(quotes, 'parentCurrencyId');
        currencyList.map((currency: Currency) => {
            let q = cursByParentId[currency.id][0];
            if (q !== undefined) {
                currency.addOrUpdateQuote(q);
            }
        });
        return of(currencyList);
    }
}