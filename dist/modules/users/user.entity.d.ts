import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    name: string;
    email: string;
    phone: string;
    password: string;
    authMethod: string;
}
