import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('NestApplication');
  const configService = app.get(ConfigService);
  const APP_PORT = configService.getOrThrow<number>('APP_PORT', { infer: true });

  const config = new DocumentBuilder()
    .setTitle('EstetiQ API')
    .setDescription('API criada pela equipe de backend EstetiQ DevsFree')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { customSiteTitle: 'Back-End' });

  app.use(helmet());
  app.use(compression());

  await app.listen(APP_PORT, () => logger.log(`Running on port ${APP_PORT}`));
}
bootstrap();
