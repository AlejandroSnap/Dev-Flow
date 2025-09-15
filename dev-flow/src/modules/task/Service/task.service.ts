import { Inject } from "@nestjs/common";
import { taskCreate } from "../dto/create-taskdto";
import { Task } from "../../../shared/schemas/task.schema";


export class taskService{

    async create(dto: taskCreate ): Promise<Task> {
        return dto;
    }

    async editName(dto: Task, name: string){
        dto.name = name;
    }

    async editDescription(dto: Task, descriptions: string){
        dto.description = descriptions; 
    }
}