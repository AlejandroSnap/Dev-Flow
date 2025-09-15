import { Controller,Post,Get,Body } from "@nestjs/common";
import { taskService } from "../Service/task.service";
import { taskCreate } from "../dto/create-taskdto";
import { Task } from "../../../shared/schemas/task.schema";

@Controller('task')
export class taskController{

    constructor (private readonly taskservice: taskService){}

    @Post('create')
    create(@Body() dto: taskCreate){
        return this.taskservice.create(dto)
    }
    
    @Post('editName')
    editName(dto: Task, name: string){
        return this.taskservice.editName(dto,name)
    }

    @Post('editDescription')
    editDescriptionTask(dto: Task, name: string){
        return this.taskservice.editDescription(dto,name)
    }
}
