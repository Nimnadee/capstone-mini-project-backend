import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ProjectRequest} from "../model/schema/project.request";
import {NotFoundException} from "@nestjs/common";
import {RequestStatus} from "../util/project.request.status";


export class ProjectRequestRepository {

    public constructor(@InjectModel(ProjectRequest.name) private readonly projectRequestModel: Model<ProjectRequest>) {}

    public async create(projectRequest: ProjectRequest): Promise<ProjectRequest> {
            return this.projectRequestModel.create(projectRequest);
        }
    // async findByGuideId(guideId: string): Promise<ProjectRequest[]> {
    //     return this.projectRequestModel.find({ guideId }).exec();
    // }
    async findByGuideId(guideId: string): Promise<ProjectRequest[]> {
        console.log(`Fetching requests for guideId: ${guideId}`);
        // console.log(`Found requests: ${JSON.stringify(results)}`);
        return await this.projectRequestModel.find({guideId}).exec();
    }

    async findByProjectId(projectId: string): Promise<ProjectRequest[]> {
        console.log(`Fetching requests for projectId: ${projectId}`);
        const results = await this.projectRequestModel.find({ projectId }).exec();
         console.log(`Found requests: ${JSON.stringify(results)}`);
        return results;
    }
    // public async findAll(): Promise<ProjectRequest[]> {
    //     return this.projectRequestModel.find();
    // }

    async rejectRequest(requestId: string): Promise<ProjectRequest> {
        const request = await this.projectRequestModel.findById(requestId).exec();
        if (!request) {
            throw new NotFoundException('Request not found');
        }
        if (request.status !== RequestStatus.PENDING ) {
            throw new Error('Only pending requests can be rejected');
        }

        request.status = RequestStatus.REJECTED;

        // Cast to a Mongoose document and save the updated document
        return await request.save();
    }

    // async acceptRequest(requestId: string): Promise<ProjectRequest[]> {
    //     const request = await this.projectRequestModel.findById(requestId).exec();
    //     if (!request) {
    //         throw new NotFoundException('Request not found');
    //     }
    //
    //     request.status = RequestStatus.ACCEPTED;
    //     const projectId =request.projectId;
    //     const updatedExpiredRequests : ProjectRequest[] = await this.projectRequestModel.find({projectId}).exec();
    //     updatedExpiredRequests.map(s => {
    //         if(s.status!=RequestStatus.EXPIRED)
    //             {
    //                 s.status=RequestStatus.EXPIRED
    //                 this.save(s);
    //             }
    //     });
    //     // updatedExpiredRequests.map(s=> this.save(s));
    //     // Cast to a Mongoose document and save the updated document
    //     const updatedRequest = await request.save();
    //     return [updatedRequest, ...updatedExpiredRequests];
    //
    // }

    async acceptRequest(requestId: string): Promise<ProjectRequest> {
        const request = await this.projectRequestModel.findById(requestId).exec();
        if (!request) throw new NotFoundException('Request not found');

        if (request.status !== RequestStatus.PENDING) {
            throw new Error('Only pending requests can be accepted');
        }

        request.status = RequestStatus.ACCEPTED;

        await this.projectRequestModel.updateMany(
            { projectId: request.projectId, _id: { $ne: requestId } ,status: RequestStatus.PENDING },
            { status: RequestStatus.EXPIRED },
        );

         await request.save();

        return request;
    }


}