import { BoardService } from "../service/board.service";
import { RequestBoard } from "../dto/board.resquestboard";
import { Board } from "../board.interface";
export declare class BoardController {
    private readonly boardservice;
    constructor(boardservice: BoardService);
    getboard(): Promise<Board[]>;
    create(dto: RequestBoard): Promise<Board>;
    addmember(id: string, userId: string): Promise<Board>;
}
