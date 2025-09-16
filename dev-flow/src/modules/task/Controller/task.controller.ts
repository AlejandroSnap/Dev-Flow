import { Controller, Post, Get, Put, Delete, Body, Param, NotFoundException, Patch, UseGuards } from "@nestjs/common";

import { TaskService } from "../Service/task.service";

import { taskCreate } from "../dto/create-taskdto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { JwtAuthGuard } from "src/modules/auth/guard/jwt-auth.guard";

@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @UseGuards(JwtAuthGuard)
    @Post(":boardId")
    async createTask(@Param("boardId") boardId: string, @Body() dto: taskCreate) {
        return this.taskService.create(dto, boardId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getTask(@Param("id") id: string) {
        return this.taskService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateTask(@Param("id") id: string, @Body() dto: UpdateTaskDto) {
        return this.taskService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteTask(@Param("id") id: string) {
        return this.taskService.delete(id);
    }
}
