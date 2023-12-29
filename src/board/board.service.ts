import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from "./entity/board.entity";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getBoardId()
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  updateBoard(updateBoardDto: UpdateBoardDto) {
    return this.boardRepository.updateBoard(updateBoardDto);
  }

  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  deleteAllBoard(): Promise<void> {
    return this.boardRepository.deleteAllBoard();
  }
}
