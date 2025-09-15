import { taskCreate } from "src/modules/task/dto/create-taskdto";
import { Task } from "src/shared/schemas/task.schema";

export interface Board {
    id: string;
    name: string
    members: string[];
    task: Task[];
}