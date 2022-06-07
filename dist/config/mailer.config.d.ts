import { MailerOptions } from '@nestjs-modules/mailer';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigService } from '@nestjs/config';
export declare class MailerConfig {
    static getMailerConfig(configService: ConfigService): Promise<MailerOptions>;
}
export declare const mailModuleConfigAsync: MailerAsyncOptions;
