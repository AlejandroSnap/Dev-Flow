import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Board, BoardDocument } from "src/shared/schemas/board.schema";
import { Model, Types } from "mongoose";
import { Workspace, WorkspaceDocument } from "src/shared/schemas/workspace.schema";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { CreateBoardDto } from "../dto/create-board.dto";

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
  ) {}

    async create(userId: string, workspaceId: string, dto: CreateBoardDto ): Promise<BoardDocument> {
    const workspace = await this.workspaceModel.findById(workspaceId);
    if (!workspace) throw new NotFoundException('Workspace not found');

    if (!workspace.members.map(m => m.toString()).includes(userId)) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    const board = new this.boardModel({
      ...dto,
      workspaceId: new Types.ObjectId(workspaceId),
    });

    await board.save();

    workspace.boards.push(board._id);
    await workspace.save();

    return board;
  }

  async findById(id: string): Promise<BoardDocument> {
    const board = await this.boardModel.findById(id).populate('tasks');
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(userId: string, id: string, dto: UpdateBoardDto): Promise<BoardDocument> {
    const board = await this.findById(id);

    if (dto.name) board.name = dto.name;
    if (dto.description) board.description = dto.description;
    if (dto.addColumn) board.columns.push(dto.addColumn);
    if (dto.removeColumn) board.columns = board.columns.filter(c => c !== dto.removeColumn);

    return board.save();
  }

  async delete(id: string): Promise<void> {
    await this.boardModel.findByIdAndDelete(id);
  }
};