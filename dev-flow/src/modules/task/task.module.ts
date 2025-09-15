import { Module} from '@nestjs/common'
import { taskService } from './Service/task.service'
import { taskController } from './Controller/task.controller'

@Module({
    controllers: [taskController],
    providers: [taskService],
    exports: [taskService]
})
export class taskModule {}
