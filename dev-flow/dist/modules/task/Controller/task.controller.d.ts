import { TaskService } from "../Service/task.service";
import { taskCreate } from "../dto/create-taskdto";
import { UpdateTaskDto } from "../dto/update-task.dto";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(boardId: string, dto: taskCreate): Promise<import("mongoose").Document<unknown, {}, import("../../../shared/schemas/task.schema").TaskDocument, {}, {}> & import("../../../shared/schemas/task.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTask(id: string): Promise<import("../../../shared/schemas/task.schema").TaskDocument>;
    updateTask(id: string, dto: UpdateTaskDto): Promise<import("../../../shared/schemas/task.schema").TaskDocument>;
    deleteTask(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../shared/schemas/task.schema").TaskDocument, {}, {}> & import("../../../shared/schemas/task.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
