"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaConfigAsync = exports.PrismaConfig = void 0;
const config_1 = require("@nestjs/config");
class PrismaConfig {
    static async getPrismaConfig(configService) {
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
exports.PrismaConfig = PrismaConfig;
exports.prismaConfigAsync = {
    imports: [config_1.ConfigModule],
    isGlobal: true,
    useFactory: async (configSevice) => PrismaConfig.getPrismaConfig(configSevice),
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=prisma.config.js.map