import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserLogin {

    @MaxLength(45, {
        message: 'User Name is maximum 45 character',
    })
    @IsNotEmpty({
        message: 'User Name is required',
    })
    public userName: string;

    @MaxLength(30, {
        message: 'Password is maximum 30 character',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;
}
