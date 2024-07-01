import { StudentResponseDto } from "./student.dto";
import { GuideResponseDto } from "./guide.dto";

export class FeedbackResponseDto {

	public id: string;

	public content: string;

	public createdAt: Date;

	public rating:number;

	public student: StudentResponseDto;

    public guide: GuideResponseDto;
	    
}