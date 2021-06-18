declare enum authMethod {
    PHONE = "phone",
    EMAIL = "email"
}
export declare class UserAuthResponseDto {
    token: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly authMethod: authMethod;
}
export {};
