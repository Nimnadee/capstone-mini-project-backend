import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "../service/category.service";
import { CategoryRequestDto } from "../model/dto/request/category.dto";
import { Public } from "src/auth/auth.decorator";


@Controller("/categories")
@Public()
export class CategoryController {

	constructor(private readonly categoryService: CategoryService) {}

	@Get("/:id")
	public async findById(@Param() params: any, @Res() response: Response) {
		const result = await this.categoryService.findById(params.id);
		response.set(HttpStatus.OK).send(result);
	}

	@Get()
	public async findAll(@Res() response: Response) {
		const result = await this.categoryService.findAll();
		response.set(HttpStatus.OK).send(result);
	}

	@Post()
	public async create(@Body() categoryRequestDto: CategoryRequestDto, @Res() response: Response) {
		const result = await this.categoryService.create(categoryRequestDto);
		response.set(HttpStatus.CREATED).send(result);
	}

	@Put("/:id")
	public async update(@Param() params: any, @Body() categoryRequestDto: CategoryRequestDto, @Res() response: Response) {
		const result = await this.categoryService.update(params.id, categoryRequestDto);
		response.set(HttpStatus.OK).send(result);
	}

	@Delete("/:id")
	public async delete(@Param() params: any, @Res() response: Response) {
		await this.categoryService.delete(params.id);
		response.set(HttpStatus.NO_CONTENT).send({});
	}
}
