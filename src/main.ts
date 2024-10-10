import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('APP_PORT', { infer: true });

  app.use(helmet());
  app.use(compression());

  await app.listen(PORT, () =>
    console.log(`Server listening on port: ${PORT}`),
  );
}
bootstrap();
