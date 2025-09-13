import { Module } from '@nestjs/common'
import { BoardService } from './service/board.service'
import { BoardController } from './controller/board.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Board, BoardSchema } from './schema/board.schema'

@Module({
    imports: [MongooseModule.forFeature([{name: Board.name, schema: BoardSchema}])],
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule {}
