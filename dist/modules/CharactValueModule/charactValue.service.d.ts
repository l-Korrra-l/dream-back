import { CharactValue } from '@prisma/client';
import { CharactValueRepository } from 'src/persistance/repository/charactvalue.repository';
export declare class CharactValueService {
    private charactvalueRepository;
    constructor(charactvalueRepository: CharactValueRepository);
    createCharactValue(inputCharactValue: any): Promise<CharactValue>;
    deleteCharactValue(id: string): Promise<boolean>;
    deleteCharactValueByProduct(id: string): Promise<boolean>;
    deleteCharactValueByProductAndValue(id: string, name: string): Promise<boolean>;
    getOne(id: string): Promise<CharactValue>;
    getAll(): Promise<CharactValue[]>;
    findByProduct(id: string): Promise<CharactValue[]>;
    findByValue(name: string): Promise<any>;
    updateCharactValue(charactvalueId: string, charactvalueForUpdate: any): Promise<any>;
}
