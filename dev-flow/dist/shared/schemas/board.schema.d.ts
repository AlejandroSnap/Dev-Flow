import { Types, Document } from "mongoose";
export type BoardDocument = Board & Document;
export declare class Board {
    _id: Types.ObjectId;
    name: "Board" | string;
    description: string;
    columns: string[];
    workspaceId: Types.ObjectId;
    tasks: Types.ObjectId[];
}
export declare const BoardSchema: import("mongoose").Schema<Board, import("mongoose").Model<Board, any, any, any, Document<unknown, any, Board, any, {}> & Board & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Board, Document<unknown, {}, import("mongoose").FlatRecord<Board>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Board> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
