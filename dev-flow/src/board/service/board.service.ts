import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Board, boardDocument } from "../schema/board.schema";
import { Model, Types } from "mongoose";


@Injectable()
export class BoardService {
    constructor(@InjectModel(Board.name) private bdModel: Model<boardDocument>) {}

    // private boards: Board[] = [];

    async create(name: string): Promise<Board> {
    const newboard = new this.bdModel({
      name: name,
      members: [],
      task: []
    })
    return await newboard.save();
  }

  async addmember(boardId: string, userId: string): Promise<Board> {
    
    if (!Types.ObjectId.isValid(boardId)) {
      throw new Error(`BoardId ${boardId} not valid`);
    }
    const board = await this.bdModel.findById(boardId);
    if (!board){ 
        throw new Error(`Board ${boardId} not found`);
    }
    board.members.push(userId);
    return await board.save();
  }

  async find(): Promise<Board[]> {
    return await this.bdModel.find().exec();
  }

};