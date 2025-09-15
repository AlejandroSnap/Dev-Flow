import { Document, Types } from "mongoose";
export type WorkspaceDocument = Workspace & Document;
export declare class Workspace {
    name: string;
    isPublic: boolean;
    owner: Types.ObjectId;
    columns: string[];
    members: Types.ObjectId[];
    : any;
}
export declare const WorkspaceSchema: import("mongoose").Schema<Workspace, import("mongoose").Model<Workspace, any, any, any, Document<unknown, any, Workspace, any, {}> & Workspace & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workspace, Document<unknown, {}, import("mongoose").FlatRecord<Workspace>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Workspace> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
