import { Module } from '@nestjs/common';
import { StationModule } from './station/station.module';
import { UserModule } from './user/user.module';
import { TempLogModule } from './temp-log/temp-log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './core/database/db-config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StationModule,
    UserModule,
    TempLogModule,
    AuthModule,
  ],
})
export class AppModule {}
