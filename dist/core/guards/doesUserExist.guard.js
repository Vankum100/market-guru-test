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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../modules/users/users.service");
let DoesUserExist = class DoesUserExist {
    constructor(userService) {
        this.userService = userService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(request) {
        const authMethod = request.body.authMethod;
        const userExist = (authMethod === 'email') ? await this.userService.findOneByEmail(request.body.email) :
            await this.userService.findOneByPhone(request.body.phone);
        if (userExist && authMethod === 'email') {
            throw new common_1.ForbiddenException('This email already exist');
        }
        if (userExist && authMethod === 'phone') {
            throw new common_1.ForbiddenException('This phone number already exist');
        }
        return true;
    }
};
DoesUserExist = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], DoesUserExist);
exports.DoesUserExist = DoesUserExist;
//# sourceMappingURL=doesUserExist.guard.js.map