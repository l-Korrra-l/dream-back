import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { google } from 'googleapis';

export class MailerConfig {
  static async getMailerConfig(
    configService: ConfigService,
  ): Promise<MailerOptions> {
    try {
      const googleOAuthConfig = await configService.get('google-OAuth-config');

      const OAuth2 = google.auth.OAuth2;
      const OAuth2_Client = new OAuth2(
        googleOAuthConfig.clientId,
        googleOAuthConfig.clientSecret,
      );

      OAuth2_Client.setCredentials({
        refresh_token: googleOAuthConfig.refreshToken,
      });

      const accesToken = await OAuth2_Client.getAccessToken();

      return {
        transport: {
          service: 'gmail',
          secure: false,
          auth: {
            type: 'OAuth2',
            user: configService.get('MAIL_PROVIDER_EMAIL'),
            clientId: configService.get('MAIL_CLIENT_ID'),
            clientSecret: configService.get('MAIL_CLIENT_SECRET'),
            refreshToken: configService.get('REFRESH_TOKEN'),
            accessToken: accesToken.token,
          },
        },
        defaults: {
          from: 'vinyl_shop@gmail.com',
        },
        preview: true,
        template: {
          dir: join(
            process.cwd(),
            '/dist/modules/NotificationModule/templates',
          ),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      };
    } catch (err) {
      console.log(err);
    }
  }
}

export const mailModuleConfigAsync: MailerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> =>
    MailerConfig.getMailerConfig(configService),
};
