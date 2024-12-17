import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    DatabaseModule, // Import the database connection module
    UrlModule,      // Your URL feature module
  ],
})
export class AppModule {}
