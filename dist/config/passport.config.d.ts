import { ConfigService } from '@nestjs/config';
import { AuthModuleAsyncOptions, IAuthModuleOptions } from '@nestjs/passport';
export declare class PassportConfig {
    static getPassportConfig(configService: ConfigService): Promise<IAuthModuleOptions<any>>;
}
export declare const passportConfigAsync: AuthModuleAsyncOptions;
