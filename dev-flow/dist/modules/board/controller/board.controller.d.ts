import { BoardService } from "../service/board.service";
import { CreateBoardDto } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";
export declare class BoardController {
    private readonly boardservice;
    constructor(boardservice: BoardService);
    create(req: any, workspaceId: string, dto: CreateBoardDto): Promise<import("../../../shared/schemas/board.schema").BoardDocument>;
    findById(id: string): Promise<import("../../../shared/schemas/board.schema").BoardDocument>;
    update(req: any, id: string, dto: UpdateBoardDto): Promise<import("../../../shared/schemas/board.schema").BoardDocument>;
    delete(id: string): Promise<void>;
}
