import { Controller, Get, Post, Body, Param, UseGuards, Request, Delete, Patch } from "@nestjs/common";
import { BoardService } from "../service/board.service";
import { CreateBoardDto } from "../dto/create-board.dto";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";
import { UpdateBoardDto } from "../dto/update-board.dto";

@Controller('Boards')
export class BoardController {
    constructor(private readonly boardservice: BoardService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':workspaceId')
    create(@Request() req,@Param('workspaceId') workspaceId: string, @Body() dto: CreateBoardDto
    ) {
        return this.boardservice.create(req.user.userId, workspaceId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.boardservice.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() dto: UpdateBoardDto) {
        return this.boardservice.update(req.user.userId, id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.boardservice.delete(id);
    }
}
