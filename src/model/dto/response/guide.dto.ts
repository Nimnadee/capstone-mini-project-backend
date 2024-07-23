import {TechnologyResponseDto} from "./technology.dto";
import { CategoryResponseDto } from "./category.dto";

export class GuideResponseDto {

	public id: string;

	public firstName: string;

	public lastName: string;

	public email: string;

    public profilePic: string ;

    public job: string;

    public about: string;

    public milestones: string;

    public socialMediaLinks: string[];

	public categories: CategoryResponseDto[];

    public technologies:TechnologyResponseDto[];





}
