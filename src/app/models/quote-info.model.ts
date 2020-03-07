import { Adapter } from '../adapter';

export class QuoteInfo {
    parentCurrencyId: number;
    quoteId: number;

    constructor (
        price: number,
        volume_24h: number,
        market_cap: number,
        percent_change_1h: number,
        percent_change_24h: number,
        percent_change_7d: number
    ) { }

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