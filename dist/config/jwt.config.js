"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfigAsync = exports.JwtConfig = void 0;
const config_1 = require("@nestjs/config");
class JwtConfig {
    static async getJwtConfig(configService) {
        return {
            secret: configService.get('JWT_SECRET'),
        };
    }
}
exports.JwtConfig = JwtConfig;
exports.jwtConfigAsync = {
    imports: [config_1.ConfigModule],
    useFactory: async (configSevice) => JwtConfig.getJwtConfig(configSevice),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=jwt.config.js.map