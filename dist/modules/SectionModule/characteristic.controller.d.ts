import { CharacteristicService } from './characteristic.service';
export declare class CharacteristicController {
    private characteristicService;
    constructor(characteristicService: CharacteristicService);
    createCharacteristic(characteristicForCreate: any): Promise<import(".prisma/client").Characteristic>;
    updateCharacteristic(characteristicId: string, characteristicForUpdate: any): Promise<import(".prisma/client").Characteristic>;
    getCharacteristicByName(name: string): Promise<import(".prisma/client").Characteristic[]>;
    getCharacteristic(id: string): Promise<import(".prisma/client").Characteristic>;
    deleteCharacteristicByName(name: string): Promise<boolean>;
    deleteCharacteristic(id: string): Promise<boolean>;
}
