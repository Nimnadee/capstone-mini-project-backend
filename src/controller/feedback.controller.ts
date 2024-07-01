import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { FeedbackService } from "../service/feedback.service";
import { FeedbackRequestDto } from "../model/dto/request/feedback.dto";
import { Public } from "src/auth/auth.decorator";


@Controller("/feedbacks")
@Public()
export class FeedbackController {

	constructor(private readonly feedbackService: FeedbackService) {}

	@Get("/:id")
	public async findById(@Param() params: any, @Res() response: Response) {
		const result = await this.feedbackService.findById(params.id);
		response.set(HttpStatus.OK).send(result);
	}

	@Get()
	public async findAll(@Res() response: Response) {
		const result = await this.feedbackService.findAll();
		response.set(HttpStatus.OK).send(result);
	}


	@Post()
	public async create(@Body() feedbackRequestDto: FeedbackRequestDto, @Res() response: Response) {
		const result = await this.feedbackService.create(feedbackRequestDto);
		return response.status(HttpStatus.CREATED).json(result);
	}
	 
	

	@Delete("/:id")
	public async delete(@Param() params: any, @Res() response: Response) {
		await this.feedbackService.delete(params.id);
		response.set(HttpStatus.NO_CONTENT).send({});
	}
}
