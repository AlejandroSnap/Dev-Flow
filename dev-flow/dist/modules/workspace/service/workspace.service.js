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
const user_schema_1 = require("../../../shared/schemas/user.schema");
let WorkspaceService = class WorkspaceService {
    workspaceModel;
    userModel;
    constructor(workspaceModel, userModel) {
        this.workspaceModel = workspaceModel;
        this.userModel = userModel;
    }
    async create(ownerId, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(ownerId)) {
            throw new common_1.BadRequestException('User ID invalid.');
        }
        const workspace = new this.workspaceModel({
            ...dto,
            owner: new mongoose_2.Types.ObjectId(ownerId),
            members: [new mongoose_2.Types.ObjectId(ownerId)],
        });
        return await workspace.save();
    }
    async findAllForUser(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException('User ID invalid.');
        }
        return this.workspaceModel.find({ members: userId }).exec();
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
        if (dto.addColumn)
            workspace.columns.push(dto.addColumn);
        if (dto.removeColumn)
            workspace.columns = workspace.columns.filter(c => c !== dto.removeColumn);
        return workspace.save();
    }
    async delete(userId, id) {
        const workspace = await this.findById(id);
        if (workspace.owner.toString() !== userId) {
            throw new common_1.ForbiddenException('Only owner can delete workspace');
        }
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
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workspace_schema_1.Workspace.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map