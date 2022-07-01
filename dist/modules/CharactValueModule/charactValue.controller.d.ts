import { CharactValueService } from './charactValue.service';
export declare class CharactValueController {
    private charactvalueService;
    constructor(charactvalueService: CharactValueService);
    createCharactValue(charactvalueForCreate: any): Promise<import(".prisma/client").CharactValue>;
    updateCharactValue(charactvalueId: string, charactvalueForUpdate: any): Promise<any>;
    getAllcharactvalues(prod: string): Promise<import(".prisma/client").CharactValue[]>;
    getCharactValue(id: string): Promise<import(".prisma/client").CharactValue>;
    deleteCharactValueByProductAndName(prod: string, name: string): Promise<boolean>;
    deleteCharactValue(id: string): Promise<boolean>;
}
