import { WorkspaceService } from '../service/workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
export declare class WorkspaceController {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    create(req: any, dto: CreateWorkspaceDto): Promise<import("../../../shared/schemas/workspace.schema").WorkspaceDocument>;
    findAll(req: any): Promise<import("../../../shared/schemas/workspace.schema").WorkspaceDocument[]>;
    update(req: any, id: string, dto: UpdateWorkspaceDto): Promise<import("../../../shared/schemas/workspace.schema").WorkspaceDocument>;
    delete(req: any, id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../shared/schemas/workspace.schema").WorkspaceDocument, {}, {}> & import("../../../shared/schemas/workspace.schema").Workspace & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    invite(req: any, id: string, memberId: string): Promise<import("../../../shared/schemas/workspace.schema").WorkspaceDocument>;
}
