import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { StudentService } from "../service/student.service";
import { Response } from "express";
import { StudentRequestDto } from "../model/dto/request/student.dto";

@Controller("/students")
export class StudentController {

	constructor(private readonly studentService: StudentService) {}

	@Get(":id")
	public async findById(@Param() params: any, @Res() response: Response) {
		const result = await this.studentService.findById(params.id);
		response.set(HttpStatus.OK).send(result);
	}

	@Get()
	public async findAll(@Res() response: Response) {
		const result = await this.studentService.findAll();
		response.set(HttpStatus.OK).send(result);
	}

	@Post()
	public async create(@Body() studentRequestDto: StudentRequestDto, @Res() response: Response) {
		const result = await this.studentService.create(studentRequestDto);
		response.set(HttpStatus.CREATED).send(result);
	}

}

