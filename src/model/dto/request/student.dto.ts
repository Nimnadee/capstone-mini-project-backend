import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class StudentRequestDto {

    @IsNotEmpty()
    @IsString()
	public firstName: string;
    
    @IsNotEmpty()
    @IsString()
	public lastName: string;
    
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter correct email"})
	public email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
	public password: string;


	public role: string;
}

