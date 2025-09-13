import { Module } from '@nestjs/common'
import { BoardService } from './service/board.service'
import { BoardController } from './controller/board.controller'


@Module({
    imports: [],
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule {}
