import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmConfigService } from "./configs/typeorm.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }),
    BoardModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
