import { Feedback } from "../model/schema/feedback";
import { FeedbackResponseDto } from "../model/dto/response/feedback.dto";
import { StudentMapper } from "./student.mapper";
//import { GuideMapper} from "./guide.mapper";
import { FeedbackRequestDto } from "../model/dto/request/feedback.dto";
import { StudentRepository } from "../repository/student.repository";
//import { GuideRepository } from "../repository/guide.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FeedbackMapper {

	constructor(private readonly studentRepository: StudentRepository) {}

	public async feedbackToFeedbackResponseDto(feedback: Feedback) {
		const feedbackResponseDto: FeedbackResponseDto = new FeedbackResponseDto();
		feedbackResponseDto.id =  feedback._id.toString();
		feedbackResponseDto.content =  feedback.content;
		feedbackResponseDto.createdAt = feedback.createdAt;
		feedbackResponseDto.rating = feedback.rating; 
		feedbackResponseDto.student =  StudentMapper.studentToStudentResponseDto(await this.studentRepository.find(feedback.student));

		return feedbackResponseDto;
	}

	public async feedbackRequestDtoToFeedback(feedbackRequestDto: FeedbackRequestDto) {
		const feedback: Feedback = new Feedback();
		feedback.content = feedbackRequestDto.content;
		feedback.student = await this.studentRepository.findById(feedbackRequestDto.student);
		feedback.rating = feedbackRequestDto.rating;

		return feedback;
	}
}
