import {Injectable} from "@nestjs/common";
import {Technology} from "../model/schema/technology";
import {TechnologyRepository} from "../repository/technology.repository";
import {TechnologyMapper} from "../mapper/technology.mapper";
import {TechnologyResponseDto} from "../model/dto/response/Technology.dto";
import {TechnologyRequestDto} from "../model/dto/request/technology.dto";

@Injectable()
export class TechnologyService{

    constructor(private readonly technologyRepository: TechnologyRepository) {}


    public async create(technologyRequestDto:TechnologyRequestDto):Promise<TechnologyResponseDto>{
        let technology:Technology=TechnologyMapper.technologyRequestDtoToTechnology(technologyRequestDto);
        technology= await this.technologyRepository.create(technology);
        return TechnologyMapper.technologyToTechnologyResponseDto(technology);
    }


    public async findAll(): Promise<TechnologyResponseDto[]> {

        const technologies:Technology[] =await this.technologyRepository.findAll();
        return technologies.map(t => TechnologyMapper.technologyToTechnologyResponseDto(t));
    }

}