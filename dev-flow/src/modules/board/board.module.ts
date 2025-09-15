import { Module } from '@nestjs/common'
import { BoardService } from './service/board.service'
import { BoardController } from './controller/board.controller'
import { taskService } from 'src/modules/task/Service/task.service'
import { taskModule } from 'src/modules/task/task.module'
import { MongooseModule } from '@nestjs/mongoose'
import { BoardSchema, Board } from 'src/shared/schemas/board.schema'

@Module({
    imports: [taskModule,MongooseModule.forFeature([{name: Board.name,schema:BoardSchema}])],
    controllers: [BoardController],
    providers: [BoardService,taskService],
    exports: [BoardService]
})
export class BoardModule {}
