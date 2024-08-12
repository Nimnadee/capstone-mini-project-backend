import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Feedback } from "../model/schema/feedback";
import * as mongoose from "mongoose";
@Injectable()
export class FeedbackRepository {

	public constructor(@InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>) {}

	public async findById(id: string): Promise<Feedback> {
		return this.feedbackModel.findById(id);
	}

	public async findAll(): Promise<Feedback[]> {
		return this.feedbackModel.find();
	}

	public async create(feedback: Feedback): Promise<Feedback> {
		return this.feedbackModel.create(feedback);
	}

	public async delete(id: string): Promise<Feedback>{
		return this.feedbackModel.findByIdAndDelete(id)
	}

	public async findAllByGuide(guideId: string): Promise<Feedback[]>{
		const query: any = { guide: new mongoose.Types.ObjectId(guideId) }
		return await this.feedbackModel.find(query).exec()
	}
}
