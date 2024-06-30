import { Guide } from "../model/schema/guide";
import { GuideResponseDto } from "../model/dto/response/guide.dto";
import { GuideRequestDto } from "../model/dto/request/guide.dto";
import { Injectable } from "@nestjs/common";

import {TechnologyRepository} from "../repository/technology.repository";
import {TechnologyMapper} from "./technology.mapper";

@Injectable()
export class GuideMapper {
	constructor(private readonly technologyRepository:TechnologyRepository) {}

	public guideToGuideResponseDto(guide: Guide) {
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
		guideResponseDto.technologies = guide.technologies.map(tech => TechnologyMapper.technologyToTechnologyResponseDto(tech));




		return guideResponseDto;
	}

	public async guideRequestDtoToGuide(guideRequestDto: GuideRequestDto) {
		const guide: Guide = new Guide();
		guide.firstName = guideRequestDto.firstName;
		guide.lastName = guideRequestDto.lastName;
		guide.email = guideRequestDto.email;
		guide.password = guideRequestDto.password;
        guide.ProfilePic = guideRequestDto.ProfilePic;
        guide.job = guideRequestDto.job;
        guide.about = guideRequestDto.about;
        guide.milestones = guideRequestDto.milestones;
        guide.SocialMediaLinks = guideRequestDto.SocialMediaLinks;
		guide.technologies = await Promise.all(guideRequestDto.technology.map(async (id) => {
			const technology = await this.technologyRepository.findById(id);
			return technology;
		}));

		return guide;
	}
}
