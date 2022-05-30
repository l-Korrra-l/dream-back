import { HttpException, HttpStatus } from '@nestjs/common';
import fs from 'fs';

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    throw new HttpException('only image files allowed', HttpStatus.BAD_REQUEST);
    return callback(null, false);
  }
  callback(null, true);
};

export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (err) {
    throw new HttpException(err, HttpStatus.BAD_REQUEST);
  }
};
