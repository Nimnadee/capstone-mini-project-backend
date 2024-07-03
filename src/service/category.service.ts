import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryResponseDto } from "../model/dto/response/category.dto";
import { Category } from "../model/schema/category";
import { CategoryMapper } from "../mapper/category.mapper";
import { CategoryRequestDto } from "../model/dto/request/category.dto";


@Injectable()
export class CategoryService {

	constructor(private readonly categoryRepository: CategoryRepository) {}

	public async findById(id: string): Promise<CategoryResponseDto> {
		const category: Category = await this.categoryRepository.findById(id);
		return CategoryMapper.categoryToCategoryResponseDto(category);
	}

	public async findAll(): Promise<CategoryResponseDto[]> {
		const categories: Category[] = await this.categoryRepository.findAll();
        return categories.map(c => CategoryMapper.categoryToCategoryResponseDto(c));
	}

	public async create(categoryRequestDto: CategoryRequestDto): Promise<CategoryResponseDto> {
		let category: Category = CategoryMapper.categoryRequestDtoToCategory(categoryRequestDto);
		category = await this.categoryRepository.create(category);
		return CategoryMapper.categoryToCategoryResponseDto(category);
	}

	public async update(id: string, categoryRequestDto: CategoryRequestDto): Promise<CategoryResponseDto> {
		let category: Category = CategoryMapper.categoryRequestDtoToCategory(categoryRequestDto);
		category = await this.categoryRepository.update(id, category);
		return CategoryMapper.categoryToCategoryResponseDto(category);
	}

	public async delete(id: string): Promise<CategoryResponseDto> {
		const category: Category = await this.categoryRepository.delete(id);
		return CategoryMapper.categoryToCategoryResponseDto(category);
	}
}
