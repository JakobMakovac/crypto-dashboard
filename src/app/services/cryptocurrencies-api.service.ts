import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from '../models/currency.model';

@Injectable()
export class CryptocurrenciesApiService {
    rootUrl: string = 'v1/';
    constructor(
        private _http: HttpClient
    ) { }

    CryptocurrenciesListResponse(limit: number, sortBy: string): Observable<HttpResponse<any>> {
        let _method = 'GET';
        let _url = this.rootUrl + 'cryptocurrency/map';
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

    CryptocurrenciesList(limit: number = 100, sortBy: 'cmc_rank' | 'id' = 'cmc_rank'): Observable<Currency[]> {
        return this.CryptocurrenciesListResponse(limit, sortBy)
            .pipe(
                map((response: HttpResponse<Currency[]>) => {
                    return response.body;
                })
            );
    }
}