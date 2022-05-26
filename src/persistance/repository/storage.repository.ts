import { StoredImage } from '../../types/image.type';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      projectId: configService.get('STORAGE_PROJECT_ID'),
      credentials: {
        client_email: configService.get('STORAGE_CLIENT_EMAIL'),
        private_key: configService.get('STORAGE_PRIVATE_KEY'),
      },
    });

    this.bucket = configService.get('STORAGE_MEDIA_BUCKET');
  }

  async save(path: string, image: Express.Multer.File) {
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream({ contentType: image.mimetype });
    stream.on('finish', async () => {
      return await file.setMetadata({ cacheControl: 'no-cache' });
    });
    stream.end(image.buffer);
  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StoredImage> {
    const fileResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StoredImage();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StoredImage> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StoredImage();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {}),
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }

  async update(id: string, image: Express.Multer.File): Promise<void> {
    const file = this.storage
      .bucket(this.bucket)
      .file(`${this.configService.get('DEFAULT_IMAGE_DIR')}/${id}`);
    const stream = file.createWriteStream({ contentType: image.mimetype });
    stream.on('finish', async () => {
      return await file.setMetadata({ cacheControl: 'no-cache' });
    });
    stream.end(image.buffer);
  }
}
