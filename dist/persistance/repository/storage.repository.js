"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const image_type_1 = require("../../types/image.type");
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let StorageService = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.storage = new storage_1.Storage({
            projectId: configService.get('STORAGE_PROJECT_ID'),
            credentials: {
                client_email: configService.get('STORAGE_CLIENT_EMAIL'),
                private_key: configService.get('STORAGE_PRIVATE_KEY'),
            },
        });
        this.bucket = configService.get('STORAGE_MEDIA_BUCKET');
    }
    async save(path, image) {
        const file = this.storage.bucket(this.bucket).file(path);
        const stream = file.createWriteStream({ contentType: image.mimetype });
        stream.on('finish', async () => {
            return await file.setMetadata({ cacheControl: 'no-cache' });
        });
        stream.end(image.buffer);
    }
    async delete(path) {
        await this.storage
            .bucket(this.bucket)
            .file(path)
            .delete({ ignoreNotFound: true });
    }
    async get(path) {
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new image_type_1.StoredImage();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map();
        return storageFile;
    }
    async getWithMetaData(path) {
        const [metadata] = await this.storage
            .bucket(this.bucket)
            .file(path)
            .getMetadata();
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new image_type_1.StoredImage();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map(Object.entries(metadata || {}));
        storageFile.contentType = storageFile.metadata.get('contentType');
        return storageFile;
    }
    async update(id, image) {
        const file = this.storage
            .bucket(this.bucket)
            .file(`${this.configService.get('DEFAULT_IMAGE_DIR')}/${id}`);
        const stream = file.createWriteStream({ contentType: image.mimetype });
        stream.on('finish', async () => {
            return await file.setMetadata({ cacheControl: 'no-cache' });
        });
        stream.end(image.buffer);
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.repository.js.map