import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workspace } from '../schemas/workspace.schema';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { AddMemberDto } from '../dto/add-member.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async create(dto: CreateWorkspaceDto, ownerId: string): Promise<Workspace> { // Esto es para crear el nuevo espacio de trabajo
    const workspace = new this.workspaceModel({
      name: dto.name,
      owner: ownerId,
      members: [{ user: new Types.ObjectId(ownerId), role: 3 }],
    });
    return workspace.save();
  }

  async addMember(workspaceId: string, ownerId: string, dto: AddMemberDto,): Promise<Workspace> {  // agregar miembros al espacio de tabajo
    const workspace = await this.workspaceModel.findById(workspaceId);
    if (!workspace) throw new Error('Workspace not found');

    const owner = workspace.members.find(
      (m) => m.user.toString() === ownerId && m.role === 3,
    );

    if (!owner) throw new ForbiddenException('Not allowed');

    const existing = workspace.members.find((m) => m.user.toString() === dto.userId,);
    if (existing) {
      existing.role = dto.role;
    } else {
      workspace.members.push({ user: new Types.ObjectId(dto.userId), role: dto.role });
    }

    return workspace.save();
  }
}
