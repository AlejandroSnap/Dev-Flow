import { Injectable } from "@nestjs/common";
import { Board } from "../board.interface";
import { RequestBoard } from "../dto/board.resquestboard";

@Injectable()
export class BoardService {
    private boards: Board[] = [];

    async create(boardData: RequestBoard): Promise<Board> {
    const newboard: Board = {id: Date.now().toString(),
      name: boardData.name,
      members: [],
      task: []
    }
    this.boards.push(newboard);
    return await newboard;
  }

  async addmember(boardId: string, userId: string): Promise<Board> {
    const board = await this.boards.find(b => b.id === boardId);
    if (!board){ 
        throw new Error(`Board ${boardId} not found`);
    }
    board.members.push(userId)
    return await board;
  }

  async find(): Promise<Board[]> {
    return await this.boards;
  }

};