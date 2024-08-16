import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { GuideService } from "../service/guide.service";
import { Response } from "express";
import { GuideRequestDto } from "../model/dto/request/guide.dto";
import { Public } from "src/auth/auth.decorator";
import { GuideUpdateRequestDto } from "src/model/dto/request/guide.update.dto";

@Controller("/guides")
@Public()
export class GuideController {

	@Get("/get-all")
	public async findAllGuidesNew(@Res() response: Response) {
		try {
			const result = await this.guideService.findAllGuidesNew();
			// console.log("r:", result);
			response.status(HttpStatus.OK).json(result);
		} catch (error) {
			console.error("Error fetching guides:", error);
			response.status(HttpStatus.INTERNAL_SERVER_ERROR).send("An error occurred while fetching guides.");
		}
	}

	constructor(private readonly guideService: GuideService) {}

	@Get("/:id")
	public async findById(@Param() params: any, @Res() response: Response) {
		const result = await this.guideService.findById(params.id);
		response.set(HttpStatus.OK).send(result);
	}

	@Get()
	public async findAll(@Res() response: Response) {
		const result = await this.guideService.findAll();
		response.set(HttpStatus.OK).send(result);
	}

	@Post()
	public async create(@Body() guideRequestDto: GuideRequestDto, @Res() response: Response) {
		const result = await this.guideService.create(guideRequestDto);
		response.set(HttpStatus.CREATED).send(result);
	}

    @Put("/:id")
	public async update(@Param() params: any, @Body() guideRequestDto: GuideUpdateRequestDto, @Res() response: Response) {
		const result = await this.guideService.update(params.id, guideRequestDto);
		response.set(HttpStatus.OK).send(result);
	}



}

