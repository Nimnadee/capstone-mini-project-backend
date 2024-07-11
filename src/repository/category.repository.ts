import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "../model/schema/category";

@Injectable()
export class CategoryRepository {
	static find(category: Category): Category {
		throw new Error("Method not implemented.");
	}
	
	public constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

	public async find(category: Category): Promise<Category> {
		return this.categoryModel.findById(category._id);
	}
	
	public async findById(id: string): Promise<Category> {
		return this.categoryModel.findById(id);
	}

	public async findAll(): Promise<Category[]> {
		return this.categoryModel.find();
	}

	public async create(category: Category): Promise<Category> {
		return this.categoryModel.create(category);
	}

	public async update(id: string, category: Category): Promise<Category> {
		return this.categoryModel.findByIdAndUpdate(id, category, {new: true});
	}

	public async delete(id: string): Promise<Category>{
		return this.categoryModel.findByIdAndDelete(id);
	}
}
