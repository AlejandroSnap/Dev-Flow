import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({timestamps: true})

export class Board{

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
    workspaceId: Types.ObjectId;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
    tasks: Types.ObjectId[];
}
export const BoardSchema = SchemaFactory.createForClass(Board)