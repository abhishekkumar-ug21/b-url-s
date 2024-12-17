import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is loaded
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const uri = isProduction
          ? configService.get<string>('MONGODB_URI_PROD') // Remote MongoDB URI
          : configService.get<string>('MONGODB_URI_DEV'); // Local MongoDB URI
          console.log(`Connecting to ${isProduction ? 'Production' : 'Local'} MongoDB at: ${uri}`);
        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}