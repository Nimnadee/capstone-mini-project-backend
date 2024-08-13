import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "../repository/project.repository";
import { ProjectResponseDto } from "../model/dto/response/project.dto";
import { Project } from "../model/schema/project";
import { ProjectMapper } from "../mapper/project.mapper";
import { ProjectRequestDto } from "../model/dto/request/project.dto";
import {GuideResponseDto} from "../model/dto/response/guide.dto";
import {Category} from "../model/schema/category";
import {Technology} from "../model/schema/technology";
import {GuideService} from "./guide.service";
import {CategoryResponseDto} from "../model/dto/response/category.dto";
import {TechnologyResponseDto} from "../model/dto/response/technology.dto";
import {MatchedGuideResponseDTO} from "../model/dto/response/matched.guide.dto";
import {FeedbackService} from "./feedback.service";
import {FeedbackResponseDto} from "../model/dto/response/feedback.dto";



@Injectable()
export class ProjectService {

	constructor(private readonly projectRepository: ProjectRepository,
	            private readonly projectMapper: ProjectMapper,
	private readonly guideService: GuideService, private readonly feedbackService: FeedbackService){}

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

	public async getMatchingGuidesByProjectId(id: string): Promise<MatchedGuideResponseDTO[]> {
		const project:Project = await this.projectRepository.findById(id);
		const categories:Array<Category>=project.categories;
		const technologies:Array<Technology>=project.technologies;
		const guides:GuideResponseDto[]=await this.guideService.findAll();
		const matchingGuides: Map<string,number> = new Map();


		for( let i=0; categories.length > i; i++){
			const category:Category=categories[i];
			for(let j=0;guides.length>j; j++){
				const guide:GuideResponseDto = guides[j];
				const isMatched:boolean =this.isMatchedWithGuideCategories(category,guide);
				if(isMatched){
					if(matchingGuides.get(guide.id)!=null){
						matchingGuides.set(guide.id,matchingGuides.get(guide.id)+1);
					}
					else{
						matchingGuides.set(guide.id, 1);
					}
				}
			}
		}

		for(let i=0;i<technologies.length;i++){
			const technology:Technology=technologies[i];
			for(let j=0;j<guides.length;j++){
				const guide:GuideResponseDto =guides[j];
				const isMatched:boolean =this.isMatchedWithGuideTechnologies(technology,guide);
				if(isMatched){
					if(matchingGuides.get(guide.id)!=null){
						matchingGuides.set(guide.id,matchingGuides.get(guide.id)+1);
					}
					else{
						matchingGuides.set(guide.id, 1);
					}
				}
			}
		}

		console.log("matchingGuides: ",matchingGuides);
		function getKeysSortedByValueDesc(map: Map<string, number>): string[] {
			const sortedArray = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
			console.log("decOrder: ", sortedArray);

			// Explicitly type the destructured parameter
			return sortedArray.map(([key]: [string, number]) => key);
		}


		const sortedKeys = getKeysSortedByValueDesc(matchingGuides);
		console.log("sortedKeys: ",sortedKeys);
//
		const matchingGuideObjects: MatchedGuideResponseDTO[] = [];
		for (const key of sortedKeys) {
			const guide = await this.guideService.findById(key);
			const feedBacks = await this.feedbackService.findAllByGuide(guide.id);
			if (guide) {
				const matchedGuideResponse: MatchedGuideResponseDTO = new MatchedGuideResponseDTO();
				matchedGuideResponse.id = guide.id;
				matchedGuideResponse.fullName = guide.firstName + " " + guide.lastName;
				matchedGuideResponse.job=guide.job;
				matchedGuideResponse.email = guide.email;
				matchedGuideResponse.rating = this.calcuclateAvarageFeedback(feedBacks);
				matchedGuideResponse.reviewCount = feedBacks.length;
				matchingGuideObjects.push(matchedGuideResponse);
			}
		}

		return matchingGuideObjects;

	}

	private calcuclateAvarageFeedback(feedbacks: FeedbackResponseDto[]): number{
		let totalRating = 0;
		for (const feedback of feedbacks) {
			totalRating += feedback.rating;

		}
		return totalRating/feedbacks.length;

	}

	public isMatchedWithGuideCategories(category: Category, guide: GuideResponseDto):boolean{
		const categoriesOfGuide:CategoryResponseDto[] =guide.categories;
		return categoriesOfGuide.some(guideCategory=>guideCategory.id===category._id.toString());

	}
	public isMatchedWithGuideTechnologies(technology: Technology, guide: GuideResponseDto):boolean{
		const technologiesOfGuide:TechnologyResponseDto[] =guide.technologies;
		return technologiesOfGuide.some(guideTechnology=>guideTechnology.id===technology._id.toString());

	}


	public async findByStudentId(studentId: string): Promise<ProjectResponseDto[]> {
		const projects: Project[] = await this.projectRepository.findByStudentId(studentId);
		return Promise.all(projects.map(project => this.projectMapper.projectToProjectResponseDto(project)));
	}
}
