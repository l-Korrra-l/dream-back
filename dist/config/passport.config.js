"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfigAsync = exports.PassportConfig = void 0;
const config_1 = require("@nestjs/config");
class PassportConfig {
    static async getPassportConfig(configService) {
        return {
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        };
    }
}
exports.PassportConfig = PassportConfig;
exports.passportConfigAsync = {
    imports: [config_1.ConfigModule],
    useFactory: async (configSevice) => PassportConfig.getPassportConfig(configSevice),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=passport.config.js.map