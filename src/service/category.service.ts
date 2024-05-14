import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryResponseDto } from "../model/dto/response/category.dto";
import { Category } from "../model/schema/category";
import { CategoryMapper } from "../mapper/category.mapper";
import { CategoryRequestDto } from "../model/dto/request/category.dto";


@Injectable()
export class CategoryService {

	constructor(private readonly categoryRepository: CategoryRepository,
	            private readonly categoryMapper: CategoryMapper) {}

	public async findById(id: string): Promise<CategoryResponseDto> {
		const category: Category = await this.categoryRepository.findById(id);
		return await this.categoryMapper.categoryToCategoryResponseDto(category);
	}

	public async findAll(): Promise<CategoryResponseDto[]> {
		const categories: Category[] = await this.categoryRepository.findAll();
		const categoryResponseDtos: CategoryResponseDto[] = [];

		for (const p of categories) {
			categoryResponseDtos.push(await this.categoryMapper.categoryToCategoryResponseDto(p));
		}
		return categoryResponseDtos;
	}

	public async create(categoryRequestDto: CategoryRequestDto): Promise<CategoryResponseDto> {
		let category: Category = await this.categoryMapper.categoryRequestDtoToCategory(categoryRequestDto);
		category = await this.categoryRepository.create(category);
		return this.categoryMapper.categoryToCategoryResponseDto(category);
	}

	public async update(id: string, categoryRequestDto: CategoryRequestDto): Promise<CategoryResponseDto> {
		let category: Category = await this.categoryMapper.categoryRequestDtoToCategory(categoryRequestDto);
		category = await this.categoryRepository.update(id, category);
		return this.categoryMapper.categoryToCategoryResponseDto(category);
	}

	public async delete(id: string): Promise<CategoryResponseDto> {
		const category: Category = await this.categoryRepository.delete(id);
		return this.categoryMapper.categoryToCategoryResponseDto(category);
	}
}
