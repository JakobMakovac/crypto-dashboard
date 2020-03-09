import { Currency } from 'src/app/models/currency.model';

export interface CurrenciesState {
    currencies: Currency[],
    selectedCurrencyId: number
}

export const initialCurrenciesState: CurrenciesState = {
    currencies: null,
    selectedCurrencyId: null
}