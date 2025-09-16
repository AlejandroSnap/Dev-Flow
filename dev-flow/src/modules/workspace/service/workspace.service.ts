import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Workspace, WorkspaceDocument } from 'src/shared/schemas/workspace.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';

import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { Console } from 'console';
import { Board, BoardDocument } from 'src/shared/schemas/board.schema';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) { }

  async create(ownerId: string, dto: CreateWorkspaceDto): Promise<WorkspaceDocument> {
    if (!Types.ObjectId.isValid(ownerId)) {
      throw new BadRequestException('User ID invalid.');
    }

    const workspace = new this.workspaceModel({
      ...dto,
      owner: new Types.ObjectId(ownerId),
      members: [new Types.ObjectId(ownerId)],
      boards: [],
    });

    return await workspace.save();
  }

  async findById(id: string): Promise<WorkspaceDocument> {
    const workspace = await this.workspaceModel.findById(id);
    if (!workspace) throw new NotFoundException('Workspace not found');
    return workspace;
  }

  async update(userId: string, id: string, dto: UpdateWorkspaceDto): Promise<WorkspaceDocument> {
    const workspace = await this.findById(id);
    if (workspace.owner.toString() !== userId) {
      throw new ForbiddenException('Only owner can edit workspace');
    }

    if (dto.name) workspace.name = dto.name;
    if (dto.isPublic !== undefined) workspace.isPublic = dto.isPublic;

    return workspace.save();
  }

  async delete(userId: string, id: string) {
    const workspace = await this.findById(id);
    if (workspace.owner.toString() !== userId) {
      throw new ForbiddenException('Only owner can delete workspace');
    }

    await this.boardModel.deleteMany({ workspaceId: id });
    return this.workspaceModel.findByIdAndDelete(id);
  }


  async invite(userId: string, workspaceId: string, memberId: string): Promise<WorkspaceDocument> {
    const workspace = await this.findById(workspaceId);
    if (workspace.owner.toString() !== userId) {
      throw new ForbiddenException('Only owner can invite members');
    }
    if (!workspace.members.includes(memberId as any)) {
      workspace.members.push(new Types.ObjectId(memberId));
      await workspace.save();
    }
    return workspace;
  }

  async addBoard(userId: string, workspaceId: string, name: string, description?: string): Promise<BoardDocument> {
    const workspace = await this.findById(workspaceId);

    if (workspace.owner.toString() !== userId && !workspace.members.includes(new Types.ObjectId(userId))) {
      throw new ForbiddenException('Only members can add boards');
    }

    const board = new this.boardModel({
      name,
      description,
      workspaceId: workspace._id,
      tasks: [],
    });

    await board.save();

    workspace.boards.push(board._id);
    await workspace.save();

    return board;
  }
}