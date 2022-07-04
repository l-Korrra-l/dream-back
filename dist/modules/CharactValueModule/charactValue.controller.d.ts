import { CharactValueService } from './charactValue.service';
import { CharacteristicValueForCreate } from './dto/characteristicvalueforcreate.dto';
export declare class CharactValueController {
    private charactvalueService;
    constructor(charactvalueService: CharactValueService);
    createCharactValue(charactvalueForCreate: CharacteristicValueForCreate): Promise<import(".prisma/client").CharactValue>;
    updateCharactValue(charactvalueId: string, charactvalueForUpdate: any): Promise<import(".prisma/client").CharactValue>;
    getAllcharactvalues(prod: string): Promise<import(".prisma/client").CharactValue[]>;
    getCharactValue(id: string): Promise<import(".prisma/client").CharactValue>;
    deleteCharactValueByProductAndName(prod: string, name: string): Promise<boolean>;
    deleteCharactValue(id: string): Promise<boolean>;
}
