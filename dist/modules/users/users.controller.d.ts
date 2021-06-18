import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    profile(id: number, req: any): Promise<User>;
    getUsers(offset?: number, limit?: number): Promise<any>;
    update(id: number, user: UserDto, req: any): Promise<User>;
    remove(id: number, req: any): Promise<string>;
}
