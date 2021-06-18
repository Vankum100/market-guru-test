import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(login: string, pass: string) {
        // find if user exist with this email or phone number
        const userWithEmail =  await this.userService.findOneByEmail(login);
        const userWithPhone = await this.userService.findOneByPhone(login);

        if (!userWithEmail || !userWithPhone) {
            return null;
        }
        const user = (userWithEmail) ? userWithEmail : userWithPhone;

        // find if user password match
        const match = await AuthService.comparePassword(pass, user.password);

        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues'];
        return result;
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    public async create(user) {
        // hash the password
        const pass = await AuthService.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        return await this.jwtService.signAsync(user);
    }

    private static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    private static async comparePassword(enteredPassword, dbPassword) {
        return await bcrypt.compare(enteredPassword, dbPassword);
    }
}
