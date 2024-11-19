import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { EdgeDBModule } from './edgedb/edgedb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EdgeDBModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
