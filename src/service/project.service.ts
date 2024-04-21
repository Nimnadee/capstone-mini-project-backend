import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../repository/project.repository";
import { ProjectResponseDto } from "../model/dto/response/project.dto";
import { Project } from "../model/schema/project";
import { ProjectMapper } from "../mapper/project.mapper";
import { ProjectRequestDto } from "../model/dto/request/project.dto";


@Injectable()
export class ProjectService {

	constructor(private readonly projectRepository: ProjectRepository,
	            private readonly projectMapper: ProjectMapper) {}

	public async findById(id: string): Promise<ProjectResponseDto> {
		const project: Project = await this.projectRepository.findById(id);
		return await this.projectMapper.projectToProjectResponseDto(project);
	}

	public async findAll(): Promise<ProjectResponseDto[]> {
		const projects: Project[] = await this.projectRepository.findAll();
		const projectResponseDtos: ProjectResponseDto[] = [];

		for (const p of projects) {
			projectResponseDtos.push(await this.projectMapper.projectToProjectResponseDto(p));
		}
		return projectResponseDtos;
	}

	public async create(projectRequestDto: ProjectRequestDto): Promise<ProjectResponseDto> {
		let project: Project = await this.projectMapper.projectRequestDtoToProject(projectRequestDto);
		project = await this.projectRepository.create(project);
		return this.projectMapper.projectToProjectResponseDto(project);
	}

	public async update(id: string, projectRequestDto: ProjectRequestDto): Promise<ProjectResponseDto> {
		let project: Project = await this.projectMapper.projectRequestDtoToProject(projectRequestDto);
		project = await this.projectRepository.update(id, project);
		return this.projectMapper.projectToProjectResponseDto(project);
	}

	public async delete(id: string): Promise<ProjectResponseDto> {
		const project: Project = await this.projectRepository.delete(id);
		return this.projectMapper.projectToProjectResponseDto(project);
	}
}
