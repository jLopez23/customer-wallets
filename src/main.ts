import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Customer Wallets API')
    .setDescription('APIS Docs customer wallets')
    .setVersion('1.0')
    .addTag('customers')
    .addTag('wallets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis-docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  Logger.log(`Server running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
