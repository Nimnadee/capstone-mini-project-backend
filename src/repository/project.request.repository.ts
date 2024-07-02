import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ProjectRequest} from "../model/schema/project.request";


export class ProjectRequestRepository {

    public constructor(@InjectModel(ProjectRequest.name) private readonly projectRequestModel: Model<ProjectRequest>) {}

    public async create(projectRequest: ProjectRequest): Promise<ProjectRequest> {
            return this.projectRequestModel.create(projectRequest);
        }
    async findByGuideId(guideId: string): Promise<ProjectRequest[]> {
        return this.projectRequestModel.find({ guideId }).exec();
    }


}