declare enum authMethod {
    PHONE = "phone",
    EMAIL = "email"
}
export declare class UserDto {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly authMethod: authMethod;
}
export {};
