import { Model } from "mongoose";
import { Task, TaskDocument } from "../../../shared/schemas/task.schema";
import { taskCreate } from "../dto/create-taskdto";
import { UpdateTaskDto } from "../dto/update-task.dto";
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    create(dto: taskCreate, boardId: string): Promise<import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateTaskDto): Promise<TaskDocument>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findById(id: string): Promise<TaskDocument>;
}
