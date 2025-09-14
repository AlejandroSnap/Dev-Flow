import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Workspace, WorkspaceDocument } from 'src/shared/schemas/workspace.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';

import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';
import { Console } from 'console';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
) {}

  async create(ownerId: string, dto: CreateWorkspaceDto): Promise<WorkspaceDocument> {
    if (!Types.ObjectId.isValid(ownerId)) {
      throw new BadRequestException('User ID invalid.');
    }
    
    const workspace = new this.workspaceModel({
      ...dto,
      owner: new Types.ObjectId(ownerId),
      members: [new Types.ObjectId(ownerId)],
    });

    return await workspace.save();
  }

  async findAllForUser(userId: string): Promise<WorkspaceDocument[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('User ID invalid.');
    }

    return this.workspaceModel.find({ members: userId }).exec();
  }

  async findById(id: string) : Promise<WorkspaceDocument>  {
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
    if (dto.addColumn) workspace.columns.push(dto.addColumn);
    if (dto.removeColumn) workspace.columns = workspace.columns.filter(c => c !== dto.removeColumn);

    return workspace.save();
  }

  async delete(userId: string, id: string) {
    const workspace = await this.findById(id);
    if (workspace.owner.toString() !== userId) {
      throw new ForbiddenException('Only owner can delete workspace');
    }
    return this.workspaceModel.findByIdAndDelete(id);
  }

  async invite(userId: string, workspaceId: string, memberId: string) : Promise<WorkspaceDocument> {
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
}