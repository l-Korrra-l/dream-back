import { Currency } from '@prisma/client';
import { CurrencyRepository } from 'src/persistance/repository/currency.repository';
export declare class CurrencyService {
    private currencyRepository;
    constructor(currencyRepository: CurrencyRepository);
    createCurrency(currency: string): Promise<Currency>;
    getOne(): Promise<Currency>;
    updateCurrency(newRate: string): Promise<Currency>;
}
