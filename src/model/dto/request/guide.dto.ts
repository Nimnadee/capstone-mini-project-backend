import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

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
  public profilePic: string;

  @IsString()
  public job: string;

  @IsString()
  public about: string;

  @IsString()
  public milestones: string;

  @IsString()
  public socialMediaLinks: string;

	public category: string[];

  public technologies:string[];

  public role: string;

}