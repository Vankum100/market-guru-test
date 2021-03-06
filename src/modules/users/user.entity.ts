import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    phone: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
    @Column({
        type: DataType.ENUM,
        values: ['phone', 'email'],
        allowNull: false,
    })
    authMethod: string;
}
