import {TechnologyResponseDto} from "./technology.dto";
import { CategoryResponseDto } from "./category.dto";

export class GuideResponseDto {

	public id: string;

	public firstName: string;

	public lastName: string;

	public email: string;

    public ProfilePic: string;

    public job: string;

    public about: string;

    public milestones: string;

    public SocialMediaLinks: string;

	public category: CategoryResponseDto;

    public technologies:TechnologyResponseDto[];





}
