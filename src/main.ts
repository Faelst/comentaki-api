// eslint-disable-next-line @typescript-eslint/no-var-requires
require('../config/config.loader').ConfigLoader.initialize(
  process.env.NODE_ENV,
);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allowed origins, you can add multiple origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Enable cookies and HTTP authentication headers
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
