import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ProjectService } from "../service/project.service";
import { ProjectRequestDto } from "../model/dto/request/project.dto";


@Controller("/projects")
export class ProjectController {

	constructor(private readonly projectService: ProjectService) {}

	@Get(":id")
	public async findById(@Param() params: any, @Res() response: Response) {
		const result = await this.projectService.findById(params.id);
		response.set(HttpStatus.OK).send(result);
	}

	@Get()
	public async findAll(@Res() response: Response) {
		const result = await this.projectService.findAll();
		response.set(HttpStatus.OK).send(result);
	}

	@Post()
	public async create(@Body() projectRequestDto: ProjectRequestDto, @Res() response: Response) {
		const result = await this.projectService.create(projectRequestDto);
		response.set(HttpStatus.CREATED).send(result);
	}

	@Put(":id")
	public async update(@Param() params: any, @Body() projectRequestDto: ProjectRequestDto, @Res() response: Response) {
		const result = await this.projectService.update(params.id, projectRequestDto);
		response.set(HttpStatus.OK).send(result);
	}

	@Delete(":id")
	public async delete(@Param() params: any, @Res() response: Response) {
		await this.projectService.delete(params.id);
		response.set(HttpStatus.NO_CONTENT).send({});
	}
}
