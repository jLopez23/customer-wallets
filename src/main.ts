import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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

  await app.listen(3000);
}
bootstrap();
