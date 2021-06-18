import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
                ) { }

    async create(user: UserDto): Promise<User> {
        return this.userRepository.create<User>(user);
    }
    async findAll(limit: number, offset: number): Promise<any> {
        const result = this.userRepository.findAndCountAll({limit, offset});
        return result;
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne<User>({where: {email}});
    }

    async findOneByPhone(phone: string): Promise<User> {
        return this.userRepository.findOne<User>({where: {phone} });
    }

    async findOneById(id: number): Promise<User> {
        return this.userRepository.findOne<User>({where: {id}});
    }
    async updateUser( id, user: UserDto): Promise<User> {
        const [_, [updatedUser]] = await this.userRepository.update({ ...user }, { where: { id }, returning: true });
        return updatedUser;
    }
    async delete(id: number): Promise<User> {
        const user = await this.userRepository.findOne<User>({where: {id}});
        await user.destroy();
        return user;
    }

}
