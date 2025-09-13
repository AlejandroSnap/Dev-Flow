import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Board extends Document {

    @Prop({required: true})
    name: string;

    @Prop({default: []})
    members: string[];

    @Prop({default: []})
    task: any[];

}

export type boardDocument = Board & Document;

export const BoardSchema = SchemaFactory.createForClass(Board)