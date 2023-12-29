import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import {BoardRepository} from "./board.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import { Board } from "./entity/board.entity";
import { User } from "../auth/entity/user.entity";
import { UserRepository } from "../auth/user.repository";

@Module({
  controllers: [BoardController],
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
