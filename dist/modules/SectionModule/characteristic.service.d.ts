import { Characteristic } from '@prisma/client';
import { CharacteristicRepository } from 'src/persistance/repository/characteristic.repository';
export declare class CharacteristicService {
    private characteristicRepository;
    constructor(characteristicRepository: CharacteristicRepository);
    createCharacteristic(inputCharacteristic: any): Promise<Characteristic>;
    deleteCharacteristic(id: string): Promise<boolean>;
    deleteCharacteristicByName(name: string): Promise<boolean>;
    getOne(id: string): Promise<Characteristic>;
    getAll(): Promise<Characteristic[]>;
    findByValue(name: string): Promise<Characteristic[]>;
    updateCharacteristic(characteristicId: string, characteristicForUpdate: any): Promise<Characteristic>;
}
