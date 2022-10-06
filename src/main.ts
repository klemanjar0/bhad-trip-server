import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import S3Service from './features/aws/s3/S3Service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
