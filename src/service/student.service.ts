import { Injectable } from "@nestjs/common";
import { Student } from "../model/schema/student";
import { StudentRepository } from "../repository/student.repository";
import { StudentRequestDto } from "../model/dto/request/student.dto";
import { StudentMapper } from "../mapper/student.mapper";
import { StudentResponseDto } from "../model/dto/response/student.dto";

@Injectable()
export class StudentService {

	constructor(private readonly studentRepository: StudentRepository) {}

	public async findById(id: string): Promise<StudentResponseDto> {
		const student: Student = await this.studentRepository.findById(id);
		return StudentMapper.studentToStudentResponseDto(student);
	}

	public async findAll(): Promise<StudentResponseDto[]> {
		const students: Student[] = await this.studentRepository.findAll();
		return students.map(s => StudentMapper.studentToStudentResponseDto(s))
	}

	public async create(studentRequestDto: StudentRequestDto): Promise<StudentResponseDto> {
		let student: Student = StudentMapper.studentRequestDtoToStudent(studentRequestDto);
		student = await this.studentRepository.create(student);
		return StudentMapper.studentToStudentResponseDto(student);
	}
}
