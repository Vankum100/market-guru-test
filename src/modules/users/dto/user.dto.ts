import {IsNotEmpty, MinLength, IsEmail, IsEnum, IsPhoneNumber, IsAlphanumeric, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
enum authMethod {
    PHONE = 'phone',
    EMAIL = 'email',
}

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('RU')
    readonly phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @IsAlphanumeric()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(authMethod, {
        message: 'authorization must be either by phone number or email',
    })
    readonly authMethod: authMethod;
}
