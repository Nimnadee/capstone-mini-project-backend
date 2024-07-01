import { Feedback } from "../model/schema/feedback";
import { FeedbackResponseDto } from "../model/dto/response/feedback.dto";
import { StudentMapper } from "./student.mapper";
import { GuideMapper} from "./guide.mapper";
import { FeedbackRequestDto } from "../model/dto/request/feedback.dto";
import { StudentRepository } from "../repository/student.repository";
import { GuideRepository } from "../repository/guide.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FeedbackMapper {

	constructor(private readonly studentRepository: StudentRepository , private readonly guideRepository: GuideRepository) {}

	public async feedbackToFeedbackResponseDto(feedback: Feedback) {
		const feedbackResponseDto: FeedbackResponseDto = new FeedbackResponseDto();
		feedbackResponseDto.id =  feedback._id.toString();
		feedbackResponseDto.content =  feedback.content;
		feedbackResponseDto.createdAt = feedback.createdAt;
		feedbackResponseDto.rating = feedback.rating;
		feedbackResponseDto.createdAt = feedback.createdAt;
		feedbackResponseDto.rating = feedback.rating;
		feedbackResponseDto.student =  StudentMapper.studentToStudentResponseDto(await this.studentRepository.find(feedback.student));
		// feedbackResponseDto.guide =  GuideMapper.guideToGuideResponseDto(await this.guideRepository.find(feedback.guide));

		return feedbackResponseDto;
	}

	public async feedbackRequestDtoToFeedback(feedbackRequestDto: FeedbackRequestDto) {
		const feedback: Feedback = new Feedback();
		feedback.content = feedbackRequestDto.content;
		feedback.student = await this.studentRepository.findById(feedbackRequestDto.student);
        // feedback.guide = await this.guideRepository.findById(feedbackRequestDto.guide);
		feedback.rating = feedbackRequestDto.rating;

		return feedback;
	}
}
