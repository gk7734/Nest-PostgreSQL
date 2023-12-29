import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardService} from "./board.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";
import { Board } from "./entity/board.entity";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoards()
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto)
    }

    @Get(':id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardService.getBoardById(id)
    }

    @Delete(':id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Delete()
    deleteAllBoard(): Promise<void> {
        return this.boardService.deleteAllBoard();
    }

    @Patch(':id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status);
    }

    @Patch('update')
    updateBoard(@Body() updateBoardDto: UpdateBoardDto): Promise<Board> {
        return this.boardService.updateBoard(updateBoardDto);
    }
}
