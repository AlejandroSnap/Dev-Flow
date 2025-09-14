import { Board } from "../board.interface";
import { RequestBoard } from "../dto/board.resquestboard";
export declare class BoardService {
    private boards;
    create(boardData: RequestBoard): Promise<Board>;
    addmember(boardId: string, userId: string): Promise<Board>;
    find(): Promise<Board[]>;
}
