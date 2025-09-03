import { Body, Controller, Param, Post } from '@nestjs/common';
import { WorkspacesService } from '../service/workspaces.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { AddMemberDto } from '../dto/add-member.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  async create(@Body() dto: CreateWorkspaceDto) {
    const ownerId = '64f....';
    return this.workspacesService.create(dto, ownerId);
  }

  @Post(':id/members')
  async addMember(
    @Param('id') workspaceId: string,
    @Body() dto: AddMemberDto,
  ) {
    const ownerId = '64f....';
    return this.workspacesService.addMember(workspaceId, ownerId, dto);
  }
}
