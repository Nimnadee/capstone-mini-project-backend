import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { StudentService } from "../service/student.service";
import { Response } from "express";
import { StudentRequestDto } from "../model/dto/request/student.dto";
import { AuthGuard } from "@nestjs/passport";
// import {StudentResponseDto} from "../model/dto/response/student.dto";

@Controller("/students")
export class StudentController {

	constructor(private readonly studentService: StudentService) {}

	@Get("/:id")
	@UseGuards(AuthGuard())
	public async findById(@Param() params: any, @Res() response: Response) {
		const result = await this.studentService.findById(params.id);
		response.set(HttpStatus.OK).send(result);
	}

	@Get()
	@UseGuards(AuthGuard())
	public async findAll(@Res() response: Response) {
		const result = await this.studentService.findAll();
		response.set(HttpStatus.OK).send(result);
	}

	@Post()
	@UseGuards(AuthGuard())
	public async create(@Body() studentRequestDto: StudentRequestDto, @Res() response: Response) {
		const result = await this.studentService.create(studentRequestDto);
		response.set(HttpStatus.CREATED).send(result);
	}

}

