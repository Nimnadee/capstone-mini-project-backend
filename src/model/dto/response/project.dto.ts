import { StudentResponseDto } from "./student.dto";

enum techType {
	LANGUAGE,
	FRAMEWORK,
	DATABASE,
}
export class ProjectResponseDto {

	public id: string;

	public title: string;

	public summary: string;

	public student: StudentResponseDto;
	public technologies:{technologyType:techType; technologyOption:string}[];


}
