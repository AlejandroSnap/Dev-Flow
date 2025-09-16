import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, UpdateAggregationStage } from "mongoose";
import { Task, TaskDocument } from "../../../shared/schemas/task.schema";
import { taskCreate } from "../dto/create-taskdto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) {}

    async create(dto: taskCreate, boardId: string) {
        if (!Types.ObjectId.isValid(boardId)) {
            throw new BadRequestException("Invalid Board ID")
        }
        
        const task = new this.taskModel({
            ...dto,
            boardId: new Types.ObjectId(boardId),
        });
        return task.save();
    }

    async update(id: string, dto: UpdateTaskDto) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException("Invalid task ID")
        }

        const task = await this.findById(id);
        if (dto.title) task.title = dto.title
        if (dto.description) task.description = dto.description
        if (dto.status) task.status = dto.status 

        return task.save()
    }

    async delete(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException("Invalid task ID")
        }
        return this.taskModel.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<TaskDocument> {
        const task = await this.taskModel.findById(id);

        if (!task) throw new NotFoundException('task not found');
        return task;
    }
}