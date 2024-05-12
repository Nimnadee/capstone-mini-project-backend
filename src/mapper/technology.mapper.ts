import {Technology} from "../model/schema/technology";
import {TechnologyResponseDto} from "../model/dto/response/technology.dto";
import {TechnologyRequestDto} from "../model/dto/request/technology.dto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TechnologyMapper {
    public static technologyRequestDtoToTechnology(technologyRequestDto: TechnologyRequestDto) {
        const technology: Technology = new Technology();
        technology.technologyName = technologyRequestDto.technologyName;
        technology.technologyType = technologyRequestDto.technologyType;
        return technology;
    }

    public static technologyToTechnologyResponseDto(technology: Technology): TechnologyResponseDto {
        const technologyResponseDto: TechnologyResponseDto = new TechnologyResponseDto();
        technologyResponseDto.id = technology._id.toString();
        technologyResponseDto.technologyType = technology.technologyType;
        technologyResponseDto.technologyName = technology.technologyName;
        return technologyResponseDto;
    }
}