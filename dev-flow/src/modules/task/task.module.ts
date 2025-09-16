import { Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TaskService } from './Service/task.service'
import { TaskController } from './Controller/task.controller'
import { Task, TaskSchema } from 'src/shared/schemas/task.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Task.name, schema: TaskSchema}, 
        ]),
    ],

    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService],
})
export class taskModule {}
