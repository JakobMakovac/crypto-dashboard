import { Injectable } from '@angular/core';
import { Adapter } from '../adapter';
import { QuoteInfo } from './quote-info.model';

export class Currency {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    cmc_rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    
    quotes: {
        [id: number]: QuoteInfo
    };

    constructor(
        id: number,
        name: string,
        symbol: string,
        slug: string,
        cmc_rank: number,
        circulating_supply: number,
        total_supply: number,
        max_supply: number
    ) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.slug = slug;
        this.cmc_rank = cmc_rank;
        this.circulating_supply = circulating_supply;
        this.total_supply = total_supply;
        this.max_supply = max_supply;
    }

    addOrUpdateQuote(quote: QuoteInfo):void {
        this.quotes[quote.parentCurrencyId] = quote[quote.parentCurrencyId];
    }
}

@Injectable()
export class CurrencyAdapter implements Adapter<Currency> {
    adapt(item: any): Currency {
        return new Currency(item.id, item.name, item.symbol, item.slug, item.cmc_rank, item.circulating_supply, item.total_supply, item.max_supply);
    }
}