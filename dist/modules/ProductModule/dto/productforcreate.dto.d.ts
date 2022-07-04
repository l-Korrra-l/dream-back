import { Decimal } from '@prisma/client/runtime';
import { CharacteristicValueForCreateFromProd } from 'src/modules/CharactValueModule/dto/characteristicvalueforcreate.prod.dto';
import { ColorForCreateFromProd } from 'src/modules/ColorModule/dto/colorforcreate.prod.dto';
import { InformationForCreateFromProd } from 'src/modules/InformationModule/dto/informationforcreate.prod.dto';
import { MaterialForCreateFromProd } from 'src/modules/MaterialModule/dto/materailforcreate.prod.dto';
import { MemoryForCreateFromProd } from 'src/modules/MemoryModule/dto/memoryforcreate.prod.dto';
export declare class ProductForCreate {
    name: string;
    short_descr?: string;
    description?: string;
    producer?: string;
    price: number;
    in_stock: number;
    img_path?: string;
    categoryId: number;
    subcategoryId: number;
    raiting: Decimal;
    characteristics: CharacteristicValueForCreateFromProd[];
    colors: ColorForCreateFromProd[];
    materials: MaterialForCreateFromProd[];
    memory: MemoryForCreateFromProd[];
    information: InformationForCreateFromProd[];
}
