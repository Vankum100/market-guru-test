import { ApiProperty } from '@nestjs/swagger';

enum authMethod {
    PHONE = 'phone',
    EMAIL = 'email',
}
export class UserAuthResponseDto  {
    @ApiProperty()
    token: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly authMethod: authMethod;
}
