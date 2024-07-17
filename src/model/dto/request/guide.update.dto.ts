import { IsNotEmpty, IsString,} from "class-validator";

export class GuideUpdateRequestDto {

  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

//   @IsString()
//   public profilePic: string;

  @IsString()
  public job: string;

  @IsString()
  public about: string;

  @IsString()
  public milestones: string;

  @IsString()
  public socialMediaLinks: string;

  public categories: string[];

  public technologies:string[];

//   public role: string;

}