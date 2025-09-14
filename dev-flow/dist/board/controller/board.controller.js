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
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("../service/board.service");
const board_resquestboard_1 = require("../dto/board.resquestboard");
let BoardController = class BoardController {
    boardservice;
    constructor(boardservice) {
        this.boardservice = boardservice;
    }
    async getboard() {
        return await this.boardservice.find();
    }
    async create(dto) {
        return await this.boardservice.create(dto);
    }
    async addmember(id, userId) {
        return await this.boardservice.addmember(id, userId);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "getboard", null);
__decorate([
    (0, common_1.Post)('crear_tablero'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [board_resquestboard_1.RequestBoard]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "addmember", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.Controller)('Boards'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map