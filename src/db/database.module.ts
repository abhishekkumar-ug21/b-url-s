import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Ensures the correct .env file is loaded
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const uri = isProduction
          ? configService.get<string>('MONGODB_URI_PROD')
          : configService.get<string>('MONGODB_URI_DEV');
        
        // Debugging logs
        console.log('NODE_ENV:', configService.get<string>('NODE_ENV'));
        // console.log('MongoDB URI for connection:', uri);
        console.log('MongoDB URI for connection: remove the uri from console');

        if (!uri) {
          throw new Error('MongoDB URI is undefined');
        }

        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
