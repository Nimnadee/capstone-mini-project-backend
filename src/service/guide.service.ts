import { Injectable } from "@nestjs/common";
import { GuideRepository } from "../repository/guide.repository";
import { GuideResponseDto } from "../model/dto/response/guide.dto";
import { Guide } from "../model/schema/guide";
import { GuideMapper } from "../mapper/guide.mapper";
import { GuideRequestDto } from "../model/dto/request/guide.dto";
import { GuideUpdateRequestDto } from "src/model/dto/request/guide.update.dto";
import { GuideUpdateMapper } from "src/mapper/guide.update.mapper";
import {GuideNewResponseDTO} from "../model/dto/response/guide.new.dto";
import {GuideNewMapper} from "../mapper/guide.new.mapper";

@Injectable()
export class GuideService {


	constructor(private readonly guideRepository: GuideRepository,
				private readonly guideUpdateMapper: GuideUpdateMapper,
				private readonly guideMapper: GuideMapper,
				private readonly guideNewMapper: GuideNewMapper,
			    ) {}

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

	public async update(id: string, guideRequestDto: GuideUpdateRequestDto): Promise<GuideResponseDto> {
		let guide: Guide = await this.guideUpdateMapper.guideRequestDtoToGuide(guideRequestDto);
		guide = await this.guideRepository.update(id, guide);
		return this.guideUpdateMapper.guideToGuideResponseDto(guide);
	}

	public async findAllGuidesNew(): Promise<GuideNewResponseDTO[]> {
		const guides: Guide[] = await this.guideRepository.findAll();

		// Map guides to DTOs and resolve all promises
		const guideDTOs: GuideNewResponseDTO[] = await Promise.all(
			guides.map(guide => this.guideNewMapper.guideToGuideNewResponseDto2(guide))
		);

		return guideDTOs;
	}


}
