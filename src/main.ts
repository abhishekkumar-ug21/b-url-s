import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins: string[] = [
    // 'http://localhost:8084',
    // 'https://staging.your-domain.com',
    // 'https://your-domain.com'
    process.env.LOCAL_ORIGINS,
    // process.env.NETLIFY_FINAL_ORIGINS,
    process.env.RANDOM_ORIGINS,
    process.env.VERCLE_FINAL_ORIGINS,
    process.env.VERCLE_ORIGINS
  ];
  const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);

  console.log('Port:', process.env.PORT); // Verify PORT variable for debugging
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
