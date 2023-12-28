import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "./configs/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      BoardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
