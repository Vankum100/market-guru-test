"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validate_pipe_1 = require("./core/pipes/validate.pipe");
const swagger_1 = require("./swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new validate_pipe_1.ValidateInputPipe());
    swagger_1.setupSwagger(app);
    await app.listen(3000);
    common_1.Logger.log(`App is running on: ${await app.getUrl()} and docs at /api`);
}
bootstrap();
//# sourceMappingURL=main.js.map