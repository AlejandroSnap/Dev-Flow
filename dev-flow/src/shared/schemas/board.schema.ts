import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

export type BoardDocument = Board & Document

@Schema({ timestamps: true })
export class Board {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: "Board" | string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: String }], default: ['Pendiente', 'In Progress', 'Finished'] })
    columns: string[];

    @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
    workspaceId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
    tasks: Types.ObjectId[];
}
export const BoardSchema = SchemaFactory.createForClass(Board)