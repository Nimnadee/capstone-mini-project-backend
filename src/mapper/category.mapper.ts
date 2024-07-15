import { Category } from "../model/schema/category";
import { CategoryResponseDto } from "../model/dto/response/category.dto";
import { CategoryRequestDto } from "../model/dto/request/category.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryMapper {

	public static categoryToCategoryResponseDto(category: Category) {
		const categoryResponseDto: CategoryResponseDto = new CategoryResponseDto();
		if (category._id) {
			categoryResponseDto.id = category._id.toString();
		}
		categoryResponseDto.categoryName =  category.categoryName;
		
		return categoryResponseDto;
	}

	public static categoryRequestDtoToCategory(categoryRequestDto: CategoryRequestDto) {
		const category: Category = new Category();
		category.categoryName = categoryRequestDto.categoryName;
		
		return category;
	}
}
