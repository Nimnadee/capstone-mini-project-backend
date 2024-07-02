import {Prop, Schema} from "@nestjs/mongoose";
import {RequestStatus} from "../../util/project.request.status";
import {Types} from "mongoose";

@Schema()
export class ProjectRequest {
    public _id: Types.ObjectId;

    @Prop({required: true})
    guideId: string;

    @Prop({required: true})
    projectId: string;

    @Prop({required: true, enum: RequestStatus, default: RequestStatus.PENDING})
    status: RequestStatus;
}