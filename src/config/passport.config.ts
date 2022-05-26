import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModuleAsyncOptions, IAuthModuleOptions } from '@nestjs/passport';

export class PassportConfig {
  static async getPassportConfig(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    configService: ConfigService,
  ): Promise<IAuthModuleOptions<any>> {
    return {
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    };
  }
}

export const passportConfigAsync: AuthModuleAsyncOptions = {
  imports: [ConfigModule],

  useFactory: async (
    configSevice: ConfigService,
  ): Promise<IAuthModuleOptions<any>> =>
    PassportConfig.getPassportConfig(configSevice),
  inject: [ConfigService],
};
