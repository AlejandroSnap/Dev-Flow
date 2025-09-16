import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from 'src/shared/schemas/workspace.schema';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { BoardDocument } from 'src/shared/schemas/board.schema';
export declare class WorkspaceService {
    private workspaceModel;
    private boardModel;
    constructor(workspaceModel: Model<WorkspaceDocument>, boardModel: Model<BoardDocument>);
    create(ownerId: string, dto: CreateWorkspaceDto): Promise<WorkspaceDocument>;
    findById(id: string): Promise<WorkspaceDocument>;
    update(userId: string, id: string, dto: UpdateWorkspaceDto): Promise<WorkspaceDocument>;
    delete(userId: string, id: string): Promise<(import("mongoose").Document<unknown, {}, WorkspaceDocument, {}, {}> & Workspace & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    invite(userId: string, workspaceId: string, memberId: string): Promise<WorkspaceDocument>;
    addBoard(userId: string, workspaceId: string, name: string, description?: string): Promise<BoardDocument>;
}
