import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Feedback } from "../model/schema/feedback";

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
}
