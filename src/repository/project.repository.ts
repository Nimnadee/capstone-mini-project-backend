import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "../model/schema/project";

@Injectable()
export class ProjectRepository {

	public constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) {}

	public async findById(id: string): Promise<Project> {
		return this.projectModel.findById(id);
	}

	public async findAll(): Promise<Project[]> {
		return this.projectModel.find();
	}

	public async create(project: Project): Promise<Project> {
		return this.projectModel.create(project);
	}

	public async update(id: string, project: Project): Promise<Project> {
		return this.projectModel.findByIdAndUpdate(id, project, {new: true});
	}

	public async delete(id: string): Promise<Project>{
		return this.projectModel.findByIdAndDelete(id)
	}
}
