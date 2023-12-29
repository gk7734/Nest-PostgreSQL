import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./configs/typeorm.config";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      BoardModule,
      AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
