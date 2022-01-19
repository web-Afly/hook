import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const listenPort = 3000, prefix = 'api',swaggerPrefix = 'docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefix)

  const config = new DocumentBuilder()
    .setTitle('hook')
    .setDescription('The hook API description')
    .setVersion('1.0')
    .addTag('api接口')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPrefix, app, document);

  await app.listen(listenPort);

  console.log(`
    page : http://localhost:${listenPort}/${prefix}
    swagger : http://localhost:${listenPort}/${swaggerPrefix}
  `)
}
bootstrap();
