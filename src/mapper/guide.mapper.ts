import { Guide } from "../model/schema/guide";
import { GuideResponseDto } from "../model/dto/response/guide.dto";
import { GuideRequestDto } from "../model/dto/request/guide.dto";
import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/repository/category.repository";
import {TechnologyRepository} from "../repository/technology.repository";
import {TechnologyMapper} from "./technology.mapper";
import {CategoryMapper} from "./category.mapper";

@Injectable()
export class GuideMapper {
	constructor(private readonly categoryRepository: CategoryRepository,private readonly technologyRepository:TechnologyRepository) {}

	public guideToGuideResponseDto(guide: Guide): GuideResponseDto {

		const guideResponseDto: GuideResponseDto = new GuideResponseDto();
		guideResponseDto.id = guide._id.toString();
		guideResponseDto.firstName = guide.firstName;
		guideResponseDto.lastName = guide.lastName;
		guideResponseDto.email = guide.email;
        guideResponseDto.profilePic = guide.profilePic;
        guideResponseDto.job = guide.job;
        guideResponseDto.about = guide.about;
        guideResponseDto.milestones = guide.milestones;
        guideResponseDto.socialMediaLinks = guide.socialMediaLinks;
		guideResponseDto.categories = guide.categories.map(cat=> CategoryMapper.categoryToCategoryResponseDto(cat));
		guideResponseDto.technologies = guide.technologies.map(tech => TechnologyMapper.technologyToTechnologyResponseDto(tech));



		return guideResponseDto;
	}

	public  async guideRequestDtoToGuide(guideRequestDto: GuideRequestDto) {
		const guide: Guide = new Guide();
		guide.firstName = guideRequestDto.firstName;
		guide.lastName = guideRequestDto.lastName;
		guide.email = guideRequestDto.email;
		guide.password = guideRequestDto.password;
        guide.profilePic = guideRequestDto.profilePic;
        guide.job = guideRequestDto.job;
        guide.about = guideRequestDto.about;
        guide.milestones = guideRequestDto.milestones;
        guide.socialMediaLinks = guideRequestDto.socialMediaLinks;
		if (guideRequestDto.categories && Array.isArray(guideRequestDto.categories)){
			guide.categories = await Promise.all(guideRequestDto.categories.map(async (id) => {
				return await this.categoryRepository.findById(id);
			}));
		} else {
			// Handle the case where technology is not an array or is undefined
			guide.categories= []; // Or handle it as appropriate for your application
			console.warn('Technology data is invalid or not provided');
		}

		if (guideRequestDto.technologies && Array.isArray(guideRequestDto.technologies)) {
			guide.technologies = await Promise.all(guideRequestDto.technologies.map(async (id) => {
				return await this.technologyRepository.findById(id);
			}));
		} else {
			// Handle the case where technology is not an array or is undefined
			guide.technologies = []; // Or handle it as appropriate for your application
			console.warn('Technology data is invalid or not provided');
		}


		return guide;
	}
}
