import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly userService: UsersService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const authMethod = request.body.authMethod;
        const userExist =  (authMethod === 'email') ? await this.userService.findOneByEmail(request.body.email) :
            await this.userService.findOneByPhone(request.body.phone);

        if (userExist && authMethod === 'email') {
            throw new ForbiddenException('This email already exist');
        }

        if (userExist && authMethod === 'phone') {
            throw new ForbiddenException('This phone number already exist');
        }
        return true;
    }
}
