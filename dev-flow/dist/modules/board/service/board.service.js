"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const board_schema_1 = require("../../../shared/schemas/board.schema");
const mongoose_1 = require("mongoose");
const workspace_schema_1 = require("../../../shared/schemas/workspace.schema");
const mongoose_2 = require("@nestjs/mongoose");
let BoardService = class BoardService {
    boardModel;
    workspaceModel;
    constructor(boardModel, workspaceModel) {
        this.boardModel = boardModel;
        this.workspaceModel = workspaceModel;
    }
    async create(userId, workspaceId, dto) {
        const workspace = await this.workspaceModel.findById(workspaceId);
        if (!workspace)
            throw new common_1.NotFoundException('Workspace not found');
        if (!workspace.members.map(m => m.toString()).includes(userId)) {
            throw new common_1.ForbiddenException('You are not a member of this workspace');
        }
        const board = new this.boardModel({
            ...dto,
            workspaceId: new mongoose_1.Types.ObjectId(workspaceId),
        });
        await board.save();
        workspace.boards.push(board._id);
        await workspace.save();
        return board;
    }
    async findById(id) {
        const board = await this.boardModel.findById(id).populate('tasks');
        if (!board)
            throw new common_1.NotFoundException('Board not found');
        return board;
    }
    async update(userId, id, dto) {
        const board = await this.findById(id);
        if (dto.name)
            board.name = dto.name;
        if (dto.description)
            board.description = dto.description;
        if (dto.addColumn)
            board.columns.push(dto.addColumn);
        if (dto.removeColumn)
            board.columns = board.columns.filter(c => c !== dto.removeColumn);
        return board.save();
    }
    async delete(id) {
        await this.boardModel.findByIdAndDelete(id);
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(board_schema_1.Board.name)),
    __param(1, (0, mongoose_2.InjectModel)(workspace_schema_1.Workspace.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], BoardService);
;
//# sourceMappingURL=board.service.js.map