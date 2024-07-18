import { Injectable } from "@nestjs/common";
import { GuideResponseDto } from "src/model/dto/response/guide.dto";
import { Guide } from "src/model/schema/guide";
 

@Injectable()

export class GuideNewMapper {

	public static guideToGuideNewResponseDto(guide: Guide): GuideResponseDto {
		const guideResponseDto: GuideResponseDto = new GuideResponseDto();
		guideResponseDto.id = guide._id.toString();
		guideResponseDto.firstName = guide.firstName;
		return guideResponseDto;
	}
}