import { Injectable } from "@nestjs/common";
import { GuideResponseDto } from "src/model/dto/response/guide.dto";
import { Guide } from "src/model/schema/guide";
import {FeedbackService} from "../service/feedback.service";
import {FeedbackResponseDto} from "../model/dto/response/feedback.dto";
import {GuideNewResponseDTO} from "../model/dto/response/guide.new.dto";
 

@Injectable()

export class GuideNewMapper {

	constructor(private readonly feedbackService: FeedbackService) {}

	public static guideToGuideNewResponseDto(guide: Guide): GuideResponseDto {

		if (!guide) {
			console.error('Guide is null in guideToGuideNewResponseDto');
			return null; // Return null or handle this case as per your requirements.
		}
		const guideResponseDto: GuideResponseDto = new GuideResponseDto();
		guideResponseDto.id = guide._id.toString();
		guideResponseDto.firstName = guide.firstName;
		return guideResponseDto;
	}


	// to show all guides in filtering system


	public async guideToGuideNewResponseDto2(guide: Guide): Promise<GuideNewResponseDTO> {
		// console.log("guideID :",guide._id.toString());
		const feedBacks = await this.feedbackService.findAllByGuide(guide._id.toString());
		const guideNewResponseDto2: GuideNewResponseDTO = new GuideNewResponseDTO();
		guideNewResponseDto2.id = guide._id.toString();
		guideNewResponseDto2.fullName = guide.firstName + " " + guide.lastName;
		guideNewResponseDto2.job = guide.job;
		guideNewResponseDto2.email = guide.email;
		guideNewResponseDto2.rating = this.calculateAvarageFeedback(feedBacks);
		guideNewResponseDto2.reviewCount=feedBacks.length;


// console.log("guideResDTO: ",guideNewResponseDto2);
		return guideNewResponseDto2;

	}
	private  calculateAvarageFeedback(feedbacks: FeedbackResponseDto[]):number {
		let totalRating = 0;
		for (const feedback of feedbacks) {
			totalRating += feedback.rating;

		}
		return totalRating/feedbacks.length;
	}

}
