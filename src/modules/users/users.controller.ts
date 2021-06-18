import {Body, Controller, Delete, Get, NotFoundException, Param, Put, Query, Request, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.entity';
import {AuthGuard} from '@nestjs/passport';
import {UserDto} from './dto/user.dto';
import {ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    @Get(':id')
    async profile(@Param('id') id: number, @Request() req): Promise<User> {
        const user = this.userService.findOneById(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [UserDto] })
    @Get()
    async getUsers(
        @Query('offset') offset: number = 1,
        @Query('limit') limit: number = 5,
    ): Promise<any> {
        return  await this.userService.findAll(limit, offset);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UserDto, @Request() req): Promise<User> {
        return this.userService.updateUser(id, req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @ApiOkResponse({ type: String })
    async remove(@Param('id') id: number, @Request() req) {
        const deleted = await this.userService.delete(id);
        if (!deleted) {
            throw new NotFoundException('This User doesn\'t exist');
        }
        return 'Successfully deleted';
    }

}
