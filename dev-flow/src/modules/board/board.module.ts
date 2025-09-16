import { Module } from '@nestjs/common'
import { BoardService } from './service/board.service'
import { BoardController } from './controller/board.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BoardSchema, Board } from 'src/shared/schemas/board.schema'
import { Workspace, WorkspaceSchema } from 'src/shared/schemas/workspace.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Board.name, schema: BoardSchema },
            { name: Workspace.name, schema: WorkspaceSchema },
        ]),
    ],
    
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule { }
