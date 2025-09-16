import { BoardDocument } from "src/shared/schemas/board.schema";
import { Model } from "mongoose";
import { WorkspaceDocument } from "src/shared/schemas/workspace.schema";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { CreateBoardDto } from "../dto/create-board.dto";
export declare class BoardService {
    private boardModel;
    private workspaceModel;
    constructor(boardModel: Model<BoardDocument>, workspaceModel: Model<WorkspaceDocument>);
    create(userId: string, workspaceId: string, dto: CreateBoardDto): Promise<BoardDocument>;
    findById(id: string): Promise<BoardDocument>;
    update(userId: string, id: string, dto: UpdateBoardDto): Promise<BoardDocument>;
    delete(id: string): Promise<void>;
}
