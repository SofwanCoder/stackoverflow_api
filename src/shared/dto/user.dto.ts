import {IsEmail, IsOptional, IsString} from 'class-validator';

// tslint:disable-next-line:class-name
export class createUserDTO {

    @IsString()
    @IsEmail()
    public email!: string;

    @IsString()
    public password!: string;

}


// tslint:disable-next-line:class-name
export class loginUserDTO {
    @IsString()
    @IsOptional()
    public email!: string;

    @IsString()
    public password!: string;
}

