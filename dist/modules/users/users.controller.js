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
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const passport_1 = require("@nestjs/passport");
const user_dto_1 = require("./dto/user.dto");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async profile(id, req) {
        const user = this.userService.findOneById(id);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async getUsers(offset = 1, limit = 5) {
        const data = await this.userService.findAll(limit, offset);
        return data;
    }
    async update(id, user, req) {
        return this.userService.updateUser(id, req.user.id);
    }
    async remove(id, req) {
        const deleted = await this.userService.delete(id);
        if (!deleted) {
            throw new common_1.NotFoundException('This User doesn\'t exist');
        }
        return 'Successfully deleted';
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOkResponse({ type: user_dto_1.UserDto }),
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "profile", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOkResponse({ type: [user_dto_1.UserDto] }),
    common_1.Get(),
    __param(0, common_1.Query('offset')),
    __param(1, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiOkResponse({ type: user_dto_1.UserDto }),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete(':id'),
    swagger_1.ApiOkResponse({ type: String }),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map