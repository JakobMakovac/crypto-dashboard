import { Currency } from 'src/app/models/currency.model';

export interface CurrenciesState {
    currencies: Currency[]
}

export const initialCurrenciesState: CurrenciesState = {
    currencies: null
}