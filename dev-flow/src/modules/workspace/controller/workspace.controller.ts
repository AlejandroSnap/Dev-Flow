import { Controller, Post, Body, Param, Patch, Delete, UseGuards, Request, Get } from '@nestjs/common';

import { WorkspaceService } from '../service/workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';
import { UpdateWorkspaceDto } from '../dto/update-workspace.dto';

import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateWorkspaceDto) {
    return this.workspaceService.create(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateWorkspaceDto) {
    return this.workspaceService.update(req.user.userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.workspaceService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.workspaceService.delete(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/invite/:memberId')
  invite(@Request() req, @Param('id') id: string, @Param('memberId') memberId: string) {
    return this.workspaceService.invite(req.user.userId, id, memberId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/boards')
  async addBoard(@Request() req, @Param('id') workspaceId: string, @Body() body: { name: string; description?: string }) {
    return this.workspaceService.addBoard(req.user.userId, workspaceId, body.name, body.description)
  }
}
