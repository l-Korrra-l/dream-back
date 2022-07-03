import { CurrencyService } from './currency.service';
export declare class CurrencyController {
    private currencyService;
    constructor(currencyService: CurrencyService);
    createCurrency(rate: any): Promise<import(".prisma/client").Currency>;
    updateCurrency(rate: string): Promise<import(".prisma/client").Currency>;
    getCurrency(): Promise<import(".prisma/client").Currency>;
}
