import { IsNotEmpty, IsNumber } from "class-validator";
import { BoardStatus } from "../board-status.enum";

export class UpdateBoardDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}