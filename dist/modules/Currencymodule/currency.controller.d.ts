import { CurrencyService } from './currency.service';
export declare class CurrencyController {
    private currencyService;
    constructor(currencyService: CurrencyService);
    createCurrency(rate: any): Promise<Currency>;
    updateCurrency(rate: string): Promise<Currency>;
    updateCurrencyPost(rate: string): Promise<Currency>;
    getCurrency(): Promise<Currency>;
}
