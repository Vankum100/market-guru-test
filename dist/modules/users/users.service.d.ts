import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    create(user: UserDto): Promise<User>;
    findAll(limit: number, offset: number): Promise<any>;
    findOneByEmail(email: string): Promise<User>;
    findOneByPhone(phone: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    updateUser(id: any, user: UserDto): Promise<User>;
    delete(id: number): Promise<User>;
}
