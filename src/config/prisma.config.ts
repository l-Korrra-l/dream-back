import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModuleAsyncOptions, PrismaServiceOptions } from 'nestjs-prisma';

export class PrismaConfig {
  static async getPrismaConfig(
    configService: ConfigService,
  ): Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        datasources: {
          db: {
            url: configService.get('DATABASE_URL'),
          },
        },
      },
      explicitConnect: true,
    };
  }
}

export const prismaConfigAsync: PrismaModuleAsyncOptions = {
  imports: [ConfigModule],
  isGlobal: true,
  useFactory: async (
    configSevice: ConfigService,
  ): Promise<PrismaServiceOptions> =>
    PrismaConfig.getPrismaConfig(configSevice),
  inject: [ConfigService],
};
