import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;
  
  @Prop()
  description: string;

  @Prop({ default: 'Pendiente' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
