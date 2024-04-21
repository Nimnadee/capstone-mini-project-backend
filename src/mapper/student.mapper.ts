import { Student } from "../model/schema/student";
import { StudentResponseDto } from "../model/dto/response/student.dto";
import { StudentRequestDto } from "../model/dto/request/student.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentMapper {

	public static studentToStudentResponseDto(student: Student) {
		const studentResponseDto: StudentResponseDto = new StudentResponseDto();
		studentResponseDto.id = student._id.toString();
		studentResponseDto.firstName = student.firstName;
		studentResponseDto.lastName = student.lastName;
		studentResponseDto.email = student.email;

		return studentResponseDto;
	}

	public static studentRequestDtoToStudent(studentRequestDto: StudentRequestDto) {
		const student: Student = new Student();
		student.firstName = studentRequestDto.firstName;
		student.lastName = studentRequestDto.lastName;
		student.email = studentRequestDto.email;
		student.password = studentRequestDto.password;

		return student;
	}
}
