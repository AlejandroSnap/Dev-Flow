import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({timestamps: true})

export class Task{

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;


    @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
    workspaceId: Types.ObjectId;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
    tasks: Types.ObjectId[];
}
export const taskSchema = SchemaFactory.createForClass(Task)