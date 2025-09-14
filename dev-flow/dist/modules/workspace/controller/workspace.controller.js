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
exports.WorkspaceController = void 0;
const common_1 = require("@nestjs/common");
const workspace_service_1 = require("../service/workspace.service");
const create_workspace_dto_1 = require("../dto/create-workspace.dto");
const update_workspace_dto_1 = require("../dto/update-workspace.dto");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
let WorkspaceController = class WorkspaceController {
    workspaceService;
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
    }
    create(req, dto) {
        return this.workspaceService.create(req.user.userId, dto);
    }
    findAll(req) {
        console.log(req.user, req.user.userId);
        return this.workspaceService.findAllForUser(req.user.userId);
    }
    update(req, id, dto) {
        return this.workspaceService.update(req.user.userId, id, dto);
    }
    delete(req, id) {
        return this.workspaceService.delete(req.user.userId, id);
    }
    invite(req, id, memberId) {
        return this.workspaceService.invite(req.user.userId, id, memberId);
    }
};
exports.WorkspaceController = WorkspaceController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_workspace_dto_1.CreateWorkspaceDto]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_workspace_dto_1.UpdateWorkspaceDto]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/invite/:memberId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], WorkspaceController.prototype, "invite", null);
exports.WorkspaceController = WorkspaceController = __decorate([
    (0, common_1.Controller)('workspaces'),
    __metadata("design:paramtypes", [workspace_service_1.WorkspaceService])
], WorkspaceController);
//# sourceMappingURL=workspace.controller.js.map