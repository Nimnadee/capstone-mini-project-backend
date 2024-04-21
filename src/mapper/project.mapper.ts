import { Project } from "../model/schema/project";
import { ProjectResponseDto } from "../model/dto/response/project.dto";
import { StudentMapper } from "./student.mapper";
import { ProjectRequestDto } from "../model/dto/request/project.dto";
import { StudentRepository } from "../repository/student.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectMapper {

	constructor(private readonly studentRepository: StudentRepository) {}

	public async projectToProjectResponseDto(project: Project) {
		const projectResponseDto: ProjectResponseDto = new ProjectResponseDto();
		projectResponseDto.id =  project._id.toString();
		projectResponseDto.title =  project.title;
		projectResponseDto.summary =  project.summary;
		projectResponseDto.student =  StudentMapper.studentToStudentResponseDto(await this.studentRepository.find(project.student));

		return projectResponseDto;
	}

	public async projectRequestDtoToProject(projectRequestDto: ProjectRequestDto) {
		const project: Project = new Project();
		project.title = projectRequestDto.title;
		project.summary = projectRequestDto.summary;
		project.student = await this.studentRepository.findById(projectRequestDto.student);

		return project;
	}
}
