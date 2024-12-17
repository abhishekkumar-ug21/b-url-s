import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UrlModule } from './url/url.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule, // Import the database connection module
    UrlModule,      // Your URL feature module
  ],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule {}
