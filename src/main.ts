import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Safely gather allowed origins from environment variables and filter out invalid ones
  const allowedOrigins = [
    process.env.LOCAL_ORIGINS,
    process.env.RANDOM_ORIGINS,
    process.env.VERCLE_FINAL_ORIGINS,
    process.env.VERCLE_ORIGINS,
  ].filter(Boolean); // Removes any undefined or empty string values

  const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);

  console.log('CORS origins set to:', allowedOrigins); // Debugging log
  console.log('Port:', process.env.PORT); // Debugging log

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
