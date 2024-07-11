import {Project} from "../model/schema/project";
import {ProjectResponseDto} from "../model/dto/response/project.dto";
import {StudentMapper} from "./student.mapper";
import {ProjectRequestDto} from "../model/dto/request/project.dto";
import {StudentRepository} from "../repository/student.repository";
import {Injectable} from "@nestjs/common";
import {TechnologyRepository} from "../repository/technology.repository";
import {TechnologyMapper} from "./technology.mapper";
import {CategoryMapper} from "./category.mapper";
import {CategoryRepository} from "src/repository/category.repository";

@Injectable()
export class ProjectMapper {

	constructor(private readonly studentRepository: StudentRepository,
		        private readonly categoryRepository: CategoryRepository,
				private readonly technologyRepository:TechnologyRepository) {}

	public async projectToProjectResponseDto(project: Project) {
		const projectResponseDto: ProjectResponseDto = new ProjectResponseDto();
		projectResponseDto.id =  project._id.toString();
		projectResponseDto.title =  project.title;
		projectResponseDto.summary =  project.summary;
		projectResponseDto.student =  StudentMapper.studentToStudentResponseDto(await this.studentRepository.find(project.student));
		 projectResponseDto.category = project.categories.map(cat=> CategoryMapper.categoryToCategoryResponseDto(cat));
		projectResponseDto.technologies = project.technologies.map(tech => TechnologyMapper.technologyToTechnologyResponseDto(tech));

		return projectResponseDto;
	}

	public async projectRequestDtoToProject(projectRequestDto: ProjectRequestDto) {
		const project: Project = new Project();
		project.title = projectRequestDto.title;
		project.summary = projectRequestDto.summary;
		project.student = await this.studentRepository.findById(projectRequestDto.student);

		if (projectRequestDto.category && Array.isArray(projectRequestDto.category)){
			project.categories = await Promise.all(projectRequestDto.category.map(async (id) => {
				return await this.categoryRepository.findById(id);
			}));
		} else {
			// Handle the case where technology is not an array or is undefined
			project.categories= []; // Or handle it as appropriate for your application
			console.warn('Technology data is invalid or not provided');
		}

		if (projectRequestDto.technology && Array.isArray(projectRequestDto.technology)) {
			project.technologies = await Promise.all(projectRequestDto.technology.map(async (id) => {
				return await this.technologyRepository.findById(id);
			}));
		  } else {
			// Handle the case where technology is not an array or is undefined
			project.technologies = []; // Or handle it as appropriate for your application
			console.warn('Technology data is invalid or not provided');
		  }
	  
		  return project;
		}
	// 	project.technologies = await Promise.all(projectRequestDto.technology.map(async (id) => {
	// 		const technology = await this.technologyRepository.findById(id);
	// 		return technology;
	// 	}));

	// 	return project;
	// }
}
