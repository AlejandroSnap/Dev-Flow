import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { BoardService } from "../service/board.service";
import { RequestBoard, RequestID } from "../dto/board.resquest";
import { Board } from "../schema/board.schema";

@Controller('boards')
export class BoardController {
    constructor(private readonly boardservice: BoardService) {}


    @Get()
    async getboard(): Promise<Board[]>{
        return await this.boardservice.find();
    }

    @Post('crear_tablero')
    async create(@Body() namedto: RequestBoard): Promise<Board> {
        return await this.boardservice.create(namedto.name);
    }

    @Post(':id/members')
    async addmember(@Param('id') id: string, @Body() userIddto: RequestID): Promise<Board> {
        return await this.boardservice.addmember(id, userIddto.Id);
    }

}
