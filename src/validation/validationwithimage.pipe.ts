// import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { ObjectSchema } from 'joi';

// @Injectable()
// export class JoiValidationWithImagePipe implements PipeTransform {
//   constructor(private schema: ObjectSchema, private imageSchema: ObjectSchema) {}

//   transform(value: any, metadata: ArgumentMetadata) {
    
//     const image = this.imageSchema.validate(value).value
//     const result = this.schema.validate(value).value

//     if(image || result){
//         return value
//     }
//     throw new BadRequestException('Validation error');

//   }
// }