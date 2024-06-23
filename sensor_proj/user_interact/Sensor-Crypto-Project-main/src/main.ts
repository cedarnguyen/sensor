import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Adjust the limit as needed

  await app.listen(3000);
}
bootstrap();
