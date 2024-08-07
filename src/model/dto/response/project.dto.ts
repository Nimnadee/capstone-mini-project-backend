import { CategoryResponseDto } from "./category.dto";
import { StudentResponseDto } from "./student.dto";
import {TechnologyResponseDto} from "./technology.dto";

export class ProjectResponseDto {

	public id: string;

	public title: string;

	public summary: string;

	public student: StudentResponseDto;

	public category: CategoryResponseDto[];

	public technologies:TechnologyResponseDto[];


}
