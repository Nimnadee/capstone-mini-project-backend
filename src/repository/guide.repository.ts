import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Guide } from "../model/schema/guide";
import { Model } from "mongoose";

@Injectable()
export class GuideRepository {

	public constructor(@InjectModel(Guide.name) private readonly guideModel: Model<Guide>) {}

	public async find(guide: Guide): Promise<Guide> {
		return this.guideModel.findById(guide._id);
	}

	public async findById(id: string): Promise<Guide> {
		return this.guideModel.findById(id);
	}

	public async findAll(): Promise<Guide[]> {
		return this.guideModel.find();
	}

	public async create(guide: Guide): Promise<Guide> {
		return this.guideModel.create(guide);
	}

    public async update(id: string, guide: Guide): Promise<Guide> {
		return this.guideModel.findByIdAndUpdate(id, guide, {new: true});
	}
}
