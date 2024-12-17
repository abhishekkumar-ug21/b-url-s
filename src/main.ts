import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Port:', process.env.PORT); // Verify PORT variable for debugging
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
