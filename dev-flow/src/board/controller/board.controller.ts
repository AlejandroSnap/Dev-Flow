import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { BoardService } from "../service/board.service";
import { RequestBoard } from "../dto/board.resquestboard";
import { Board } from "../board.interface";

@Controller('Boards')
export class BoardController {
    constructor(private readonly boardservice: BoardService) {}


    @Get()
    async getboard(): Promise<Board[]>{
        return await this.boardservice.find();
    }

    @Post('crear_tablero')
    async create(@Body() dto: RequestBoard): Promise<Board> {
        return await this.boardservice.create(dto);
    }

    @Post(':id/members')
    async addmember(@Param('id') id: string, @Body('userId') userId: string): Promise<Board> {
        return await this.boardservice.addmember(id, userId);
    }

}
