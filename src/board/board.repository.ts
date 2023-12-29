import {DataSource, Repository} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import { Board } from "./entity/board.entity";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.findOneBy({ id: id });

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async getBoardId(): Promise<Board[]> {
        return await this.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });

        await this.save(board);

        return board;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.save(board);

        return board
    }

    async updateBoard(updateBoardDto: UpdateBoardDto) {
        const { id, title, description } = updateBoardDto;
        const board = await this.getBoardById(id);

        board.title = title;
        board.description = description;
        await this.save(board);

        return board
    }

    async deleteAllBoard(): Promise<void> {
        await this.delete({})
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }
}