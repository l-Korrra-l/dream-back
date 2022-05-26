import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageService } from 'src/persistance/repository/storage.repository';
import { SaveImageInfo } from 'src/types/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ImageService {
  constructor(
    private configService: ConfigService,
    private storageService: StorageService,
  ) {}

  async createImage(image: Express.Multer.File): Promise<SaveImageInfo> {
    const generatedId = uuid();

    await this.storageService.save(`image/${generatedId}`, image);

    return {
      imageId: generatedId,
      imageUrl: this.genImageLink(generatedId),
    } as SaveImageInfo;
  }

  async updateImage(
    imageId: string,
    image: Express.Multer.File,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { encoding, fieldname, size, ...imageForUpdate } = image;

    await this.storageService.update(imageId, image);
  }

  genImageLink(id: string): string {
    return `${this.configService.get('IMAGE_DIR_PATH')}/${id}`;
  }

  validateImage(image: Express.Multer.File): void {
    if (!image) {
      throw new BadRequestException('Image not defined');
    }

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(image.mimetype)) {
      throw new BadRequestException('Wrong image mime type');
    }
  }
}
