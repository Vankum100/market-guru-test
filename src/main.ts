import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import {setupSwagger} from './swagger';
import {Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidateInputPipe());
  setupSwagger(app);
  await app.listen(3000);
  Logger.log(`App is running on: ${await app.getUrl()} and docs at /api`);
}
bootstrap();
