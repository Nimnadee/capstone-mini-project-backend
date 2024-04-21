import { StudentResponseDto } from "./student.dto";

export class ProjectResponseDto {

	public id: string;

	public title: string;

	public summary: string;

	public student: StudentResponseDto;

}
