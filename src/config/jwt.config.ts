import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export class JwtConfig {
  static async getJwtConfig(
    configService: ConfigService,
  ): Promise<JwtModuleOptions> {
    return {
      secret: configService.get('JWTsecret'),
    };
  }
}

export const jwtConfigAsync: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configSevice: ConfigService): Promise<JwtModuleOptions> =>
    JwtConfig.getJwtConfig(configSevice),
  inject: [ConfigService],
};
