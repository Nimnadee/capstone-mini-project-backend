import { IsNotEmpty, IsString,} from "class-validator";

export class GuideUpdateRequestDto {

  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @IsString()
  public job: string;

  @IsString()
  public about: string;

  @IsString()
  public milestones: string;

  public socialMediaLinks: string[];

  public profilePic: string;

  public categories: string[];

  public technologies:string[];

 

}