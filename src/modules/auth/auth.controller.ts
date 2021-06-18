import {Controller, Body, Post, UseGuards, Request} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import {ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {UserAuthResponseDto} from '../users/dto/user-auth-response.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }
    @ApiBearerAuth()
    @UseGuards(AuthGuard('local'))
    @ApiOkResponse({ type: UserAuthResponseDto })
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserExist)
    @ApiOkResponse({ type: UserAuthResponseDto })
    @Post('signup')
    async signUp(@Body() user: UserDto): Promise<{ user: Pick<any, string | number | symbol>; token: string }> {
        return this.authService.create(user);
    }
}
