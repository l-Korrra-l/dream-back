import { ConfigService } from '@nestjs/config';
import { PrismaModuleAsyncOptions, PrismaServiceOptions } from 'nestjs-prisma';
export declare class PrismaConfig {
    static getPrismaConfig(configService: ConfigService): Promise<PrismaServiceOptions>;
}
export declare const prismaConfigAsync: PrismaModuleAsyncOptions;
