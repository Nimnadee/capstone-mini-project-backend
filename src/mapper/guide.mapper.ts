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
        guideResponseDto.ProfilePic = guide.ProfilePic;
        guideResponseDto.job = guide.job;
        guideResponseDto.about = guide.about;
        guideResponseDto.milestones = guide.milestones;
        guideResponseDto.SocialMediaLinks = guide.SocialMediaLinks;
		guideResponseDto.categories = guide.categories.map(cat=> CategoryMapper.categoryToCategoryResponseDto(cat));
		//guideResponseDto.category = CategoryMapper.categoryToCategoryResponseDto(CategoryRepository.find(guide.category));
		guideResponseDto.technologies = guide.technologies.map(tech => TechnologyMapper.technologyToTechnologyResponseDto(tech));



		return guideResponseDto;
	}

	public async guideRequestDtoToGuide(guideRequestDto: GuideRequestDto) {
		const guide: Guide = new Guide();
		guide.firstName = guideRequestDto.firstName;
		guide.lastName = guideRequestDto.lastName;
		guide.email = guideRequestDto.email;
		guide.password = guideRequestDto.password;
        guide.ProfilePic = guideRequestDto.profilePic;
        guide.job = guideRequestDto.job;
        guide.about = guideRequestDto.about;
        guide.milestones = guideRequestDto.milestones;
        guide.SocialMediaLinks = guideRequestDto.socialMediaLinks;
		if (guideRequestDto.category && Array.isArray(guideRequestDto.category)){
			guide.categories = await Promise.all(guideRequestDto.category.map(async (id) => {
				return await this.categoryRepository.findById(id);
			}));
		} else {
			// Handle the case where technology is not an array or is undefined
			guide.categories= []; // Or handle it as appropriate for your application
			console.warn('Technology data is invalid or not provided');
		}

		if (guideRequestDto.technology && Array.isArray(guideRequestDto.technology)) {
			guide.technologies = await Promise.all(guideRequestDto.technology.map(async (id) => {
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
