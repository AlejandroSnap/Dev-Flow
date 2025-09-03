import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Workspace extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'User' },
        role: { type: Number, enum: [0, 1, 2, 3], default: 1 },
      },
    ],
    default: [],
  })
  members: { user: Types.ObjectId; role: number }[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
