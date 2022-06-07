import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
export declare class JwtConfig {
    static getJwtConfig(configService: ConfigService): Promise<JwtModuleOptions>;
}
export declare const jwtConfigAsync: JwtModuleAsyncOptions;
