import { Model } from 'mongoose';
import { Workspace, WorkspaceDocument } from 'src/shared/schemas/workspace.schema';
import { UserDocument } from 'src/shared/schemas/user.schema';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
export declare class WorkspaceService {
    private workspaceModel;
    private userModel;
    constructor(workspaceModel: Model<WorkspaceDocument>, userModel: Model<UserDocument>);
    create(ownerId: string, dto: CreateWorkspaceDto): Promise<WorkspaceDocument>;
    findAllForUser(userId: string): Promise<WorkspaceDocument[]>;
    findById(id: string): Promise<WorkspaceDocument>;
    update(userId: string, id: string, dto: UpdateWorkspaceDto): Promise<WorkspaceDocument>;
    delete(userId: string, id: string): Promise<(import("mongoose").Document<unknown, {}, WorkspaceDocument, {}, {}> & Workspace & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    invite(userId: string, workspaceId: string, memberId: string): Promise<WorkspaceDocument>;
}
