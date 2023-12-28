import {Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardService} from "./board.service";
import {BoardStatus} from "./board-status.enum";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatusValidationPipe} from "./pipes/board-status-validation.pipe";
import {Board} from "./board.entity";

@Controller('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }
    //
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise <Board> {
        return this.boardService.createBoard(createBoardDto)
    }

    @Get(':id')
    getBoardById(@Param('id') id: number): Promise <Board> {
        return this.boardService.getBoardById(id)
    }


    // @Get(':id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id);
    // }
    //
    // @Delete(':id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id);
    // }
    //
    // @Patch(':id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardService.updateBoardStatus(id, status);
    // }

}
