import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type WorkspaceDocument = Workspace & Document;

@Schema({ timestamps: true })
export class Workspace {
  @Prop({ required: true }) // nombre del espaci de trabajo
  name: string;

  @Prop({ default: false }) // Privacidad (publico / privado)
  isPublic: boolean; 

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // dueño
  owner: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] }) // usuarios invitados
  members: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Board' }], default: [] }) // boards asociados
  boards: Types.ObjectId[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);