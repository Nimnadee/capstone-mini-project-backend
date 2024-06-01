import { Guide } from "../model/schema/guide";
import { GuideResponseDto } from "../model/dto/response/guide.dto";
import { GuideRequestDto } from "../model/dto/request/guide.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GuideMapper {

	public static guideToGuideResponseDto(guide: Guide): GuideResponseDto {
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


		return guideResponseDto;
	}

	public static guideRequestDtoToGuide(guideRequestDto: GuideRequestDto):Guide {
		const guide = new Guide();
		guide.firstName = guideRequestDto.firstName;
		guide.lastName = guideRequestDto.lastName;
		guide.email = guideRequestDto.email;
		guide.password = guideRequestDto.password;
        guide.ProfilePic = guideRequestDto.ProfilePic;
        guide.job = guideRequestDto.job;
        guide.about = guideRequestDto.about;
        guide.milestones = guideRequestDto.milestones;
        guide.SocialMediaLinks = guideRequestDto.SocialMediaLinks;

		return guide;
	}
}
