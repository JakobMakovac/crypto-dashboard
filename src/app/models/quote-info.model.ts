import { Adapter } from '../adapter';

export class QuoteInfo {
    price: number;
    volume_24h: number;
    market_cap: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;

    parentCurrencyId: number;
    quoteId: number;

    constructor (
        price: number,
        volume_24h: number,
        market_cap: number,
        percent_change_1h: number,
        percent_change_24h: number,
        percent_change_7d: number
    ) {
        this.price = price;
        this.volume_24h = volume_24h;
        this.market_cap = market_cap;
        this.percent_change_1h = percent_change_1h;
        this.percent_change_24h = percent_change_24h;
        this.percent_change_7d = percent_change_7d;
    }

    setParent(id: number) {
        this.parentCurrencyId = id;
    }
    setId(id: number) {
        this.quoteId = id;
    }
}

export class QuoteInfoAdapter implements Adapter<QuoteInfo> {
    adapt(item: any) {
        return new QuoteInfo(item.price, item.volume_24h, item.market_cap, item.percent_change_1h, item.percent_change_24h, item.percent_change_7d)
    }
}