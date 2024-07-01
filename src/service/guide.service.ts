import { Injectable } from "@nestjs/common";
import { GuideRepository } from "../repository/guide.repository";
import { GuideResponseDto } from "../model/dto/response/guide.dto";
import { Guide } from "../model/schema/guide";
import { GuideMapper } from "../mapper/guide.mapper";
import { GuideRequestDto } from "../model/dto/request/guide.dto";

@Injectable()
export class GuideService {


	constructor(private readonly guideRepository: GuideRepository,
				private readonly guideMapper: GuideMapper) {}

	public async findById(id: string): Promise<GuideResponseDto> {
		const guide: Guide = await this.guideRepository.findById(id);
		return this.guideMapper.guideToGuideResponseDto(guide);
	}

	public async findAll(): Promise<GuideResponseDto[]> {
		const guide: Guide[] = await this.guideRepository.findAll();
		return guide.map(g => this.guideMapper.guideToGuideResponseDto(g))
	}

	public async create(guideRequestDto: GuideRequestDto): Promise<GuideResponseDto> {
		let guide: Guide = await this.guideMapper.guideRequestDtoToGuide(guideRequestDto);
		guide = await this.guideRepository.create(guide);
		return this.guideMapper.guideToGuideResponseDto(guide);
	}

	public async update(id: string, guideRequestDto: GuideRequestDto): Promise<GuideResponseDto> {
		let guide: Guide = await this.guideMapper.guideRequestDtoToGuide(guideRequestDto);
		guide = await this.guideRepository.update(id, guide);
		return this.guideMapper.guideToGuideResponseDto(guide);
	}
   
    
}
