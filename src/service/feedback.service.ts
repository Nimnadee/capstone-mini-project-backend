import { Injectable } from "@nestjs/common";
import { FeedbackRepository } from "../repository/feedback.repository";
import { FeedbackResponseDto } from "../model/dto/response/feedback.dto";
import { Feedback } from "../model/schema/feedback";
import { FeedbackMapper } from "../mapper/feedback.mapper";
import { FeedbackRequestDto } from "../model/dto/request/feedback.dto";



@Injectable()
export class FeedbackService {

	constructor(private readonly feedbackRepository: FeedbackRepository,
	            private readonly feedbackMapper: FeedbackMapper) {}

	public async findById(id: string): Promise<FeedbackResponseDto> {
		const feedback: Feedback = await this.feedbackRepository.findById(id);
		return await this.feedbackMapper.feedbackToFeedbackResponseDto(feedback);
	}

	public async findAll(): Promise<FeedbackResponseDto[]> {
		const feedbacks: Feedback[] = await this.feedbackRepository.findAll();
		const feedbackResponseDtos: FeedbackResponseDto[] = [];

		for (const f of feedbacks) {
			feedbackResponseDtos.push(await this.feedbackMapper.feedbackToFeedbackResponseDto(f));
		}
		return feedbackResponseDtos;
	}

	public async create(feedbackRequestDto: FeedbackRequestDto): Promise<FeedbackResponseDto> {
		let feedback: Feedback = await this.feedbackMapper.feedbackRequestDtoToFeedback(feedbackRequestDto);
		feedback.createdAt = new Date();
		feedback = await this.feedbackRepository.create(feedback);
		return this.feedbackMapper.feedbackToFeedbackResponseDto(feedback);
	}


	public async delete(id: string): Promise<FeedbackResponseDto> {
		const feedback: Feedback = await this.feedbackRepository.delete(id);
		return this.feedbackMapper.feedbackToFeedbackResponseDto(feedback);
	}

	public async findAllByGuide(guideId: string): Promise<FeedbackResponseDto[]>{
		const feedbacks: Feedback[] = await this.feedbackRepository.findAllByGuide(guideId);
		const feedbackResponseDtos: FeedbackResponseDto[] = [];
		for (const f of feedbacks) {
			feedbackResponseDtos.push(await this.feedbackMapper.feedbackToFeedbackResponseDto(f));
		}
		return feedbackResponseDtos;

	}
}