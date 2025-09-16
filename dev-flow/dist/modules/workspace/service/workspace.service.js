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
exports.WorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const workspace_schema_1 = require("../../../shared/schemas/workspace.schema");
const board_schema_1 = require("../../../shared/schemas/board.schema");
let WorkspaceService = class WorkspaceService {
    workspaceModel;
    boardModel;
    constructor(workspaceModel, boardModel) {
        this.workspaceModel = workspaceModel;
        this.boardModel = boardModel;
    }
    async create(ownerId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(ownerId)) {
            throw new common_1.BadRequestException('User ID invalid.');
        }
        const workspace = new this.workspaceModel({
            ...dto,
            owner: new mongoose_2.Types.ObjectId(ownerId),
            members: [new mongoose_2.Types.ObjectId(ownerId)],
            boards: [],
        });
        return await workspace.save();
    }
    async findById(id) {
        const workspace = await this.workspaceModel.findById(id);
        if (!workspace)
            throw new common_1.NotFoundException('Workspace not found');
        return workspace;
    }
    async update(userId, id, dto) {
        const workspace = await this.findById(id);
        if (workspace.owner.toString() !== userId) {
            throw new common_1.ForbiddenException('Only owner can edit workspace');
        }
        if (dto.name)
            workspace.name = dto.name;
        if (dto.isPublic !== undefined)
            workspace.isPublic = dto.isPublic;
        return workspace.save();
    }
    async delete(userId, id) {
        const workspace = await this.findById(id);
        if (workspace.owner.toString() !== userId) {
            throw new common_1.ForbiddenException('Only owner can delete workspace');
        }
        await this.boardModel.deleteMany({ workspaceId: id });
        return this.workspaceModel.findByIdAndDelete(id);
    }
    async invite(userId, workspaceId, memberId) {
        const workspace = await this.findById(workspaceId);
        if (workspace.owner.toString() !== userId) {
            throw new common_1.ForbiddenException('Only owner can invite members');
        }
        if (!workspace.members.includes(memberId)) {
            workspace.members.push(new mongoose_2.Types.ObjectId(memberId));
            await workspace.save();
        }
        return workspace;
    }
    async addBoard(userId, workspaceId, name, description) {
        const workspace = await this.findById(workspaceId);
        if (workspace.owner.toString() !== userId && !workspace.members.includes(new mongoose_2.Types.ObjectId(userId))) {
            throw new common_1.ForbiddenException('Only members can add boards');
        }
        const board = new this.boardModel({
            name,
            description,
            workspaceId: workspace._id,
            tasks: [],
        });
        await board.save();
        workspace.boards.push(board._id);
        await workspace.save();
        return board;
    }
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workspace_schema_1.Workspace.name)),
    __param(1, (0, mongoose_1.InjectModel)(board_schema_1.Board.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map