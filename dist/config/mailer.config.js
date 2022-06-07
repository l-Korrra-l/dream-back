"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailModuleConfigAsync = exports.MailerConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const googleapis_1 = require("googleapis");
class MailerConfig {
    static async getMailerConfig(configService) {
        try {
            const googleOAuthConfig = await configService.get('google-OAuth-config');
            const OAuth2 = googleapis_1.google.auth.OAuth2;
            const OAuth2_Client = new OAuth2(googleOAuthConfig.clientId, googleOAuthConfig.clientSecret);
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
                    dir: (0, path_1.join)(process.cwd(), '/dist/modules/NotificationModule/templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            };
        }
        catch (err) {
            console.log(err);
        }
    }
}
exports.MailerConfig = MailerConfig;
exports.mailModuleConfigAsync = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => MailerConfig.getMailerConfig(configService),
};
//# sourceMappingURL=mailer.config.js.map