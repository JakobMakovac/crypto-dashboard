import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency, CurrencyAdapter } from '../models/currency.model';
import { QuoteInfoAdapter, QuoteInfo } from '../models/quote-info.model';

@Injectable()
export class CryptocurrenciesApiService {
    rootUrl: string = 'v1/';
    constructor(
        private _http: HttpClient,
        private _currencyAdapter: CurrencyAdapter,
        private _quoteInfoAdapter: QuoteInfoAdapter
    ) { }

    CryptocurrenciesListResponse(limit: number, sortBy: string): Observable<HttpResponse<any>> {
        let _method = 'GET';
        let _url = this.rootUrl + 'cryptocurrency/listings/latest';
        let _params = {
            'limit': limit.toString(),
            'sort': sortBy
        };
        let _headers = new HttpHeaders({
            'X-CMC_PRO_API_KEY': '809857e2-d7ca-4f26-9e60-a316e3d95e0e'
        });
        let _body: any;


        return this._http.request(_method, _url, {
            headers: _headers,
            params: _params,
            body: _body,
            responseType: 'json',
            observe: 'response'
        })
            .pipe(
                map((response: HttpResponse<any>) => {
                    let body: Currency[];

                    body = <Currency[]>response.body.data;

                    return <HttpResponse<Currency[]>> response.clone({body: body});
                })
            );
    }

    CryptocurrenciesList(limit: number = 100, sortBy: string): Observable<Currency[]> {
        return this.CryptocurrenciesListResponse(limit, sortBy)
            .pipe(
                map((response: HttpResponse<Currency[]>) => {
                    return response.body.map(item => this._currencyAdapter.adapt(item));
                })
            );
    }

    QuotesLatestResponse(ids: string[], convertId: string): Observable<HttpResponse<any>> {
        let _method = 'GET';
        let _url = this.rootUrl + 'cryptocurrency/quotes/latest';
        let _params = {
            'id': ids.join(),
            'convert_id': convertId
        };
        let _headers = new HttpHeaders({
            'X-CMC_PRO_API_KEY': '809857e2-d7ca-4f26-9e60-a316e3d95e0e'
        });
        let _body: any;


        return this._http.request(_method, _url, {
            headers: _headers,
            params: _params,
            body: _body,
            responseType: 'json',
            observe: 'response'
        })
            .pipe(
                map((response: HttpResponse<any>) => {
                    return response.body;
                })
            );
    }

    QuotesLatest(ids: number[], convertId: number): Observable<QuoteInfo[]> {
        let idsStrings = ids.map((id: number) => id.toString());
        return this.QuotesLatestResponse(idsStrings, convertId.toString())
            .pipe(
                map((response: HttpResponse<any>) => {
                    return response.body.map((item) => {
                        let parentId = parseInt(Object.keys(item)[0]);
                        let newQuote = this._quoteInfoAdapter.adapt(item);
                        newQuote.setParent(parentId);
                        newQuote.setId(convertId);
                        return newQuote;
                    });
                })
            )
    }
}