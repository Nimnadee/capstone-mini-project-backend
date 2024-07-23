import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class GuideRequestDto {

  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail() public email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsOptional()
  public profilePic?: string;

  @IsOptional()
  @IsString()
  public job?: string;
  
  @IsOptional()
  @IsString()
  public about?: string;
  
  @IsOptional()
  @IsString()
  public milestones?: string;

  @IsOptional()
  public socialMediaLinks?: string[];
  
  @IsOptional()
	public categories?: string[];
  
  @IsOptional()
  public technologies?:string[];

  @IsOptional()
  public role: string;

}