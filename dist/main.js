"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 5000;
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'client'));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Vinyl store')
        .setDescription('The store API description')
        .setVersion('1.0')
        .addBearerAuth({
        description: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkVtYWlsQG1haWxsM2w1NjEucnUiLCJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOjIsImlhdCI6MTY1NjY2NTg0Nn0.ZuReR7M5hDJMf5OSKus0aHJKMCv4aE_RWmKWWu2NQ7Q`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map