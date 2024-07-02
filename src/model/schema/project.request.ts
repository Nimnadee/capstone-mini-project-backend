import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {RequestStatus} from "../../util/project.request.status";
import {Types} from "mongoose";

@Schema({ collection: "projectRequest" })
export class ProjectRequest {
    public _id: Types.ObjectId;

    @Prop({required: true})
    guideId: string;

    @Prop({required: true})
    projectId: string;

    @Prop({required: true, enum: RequestStatus, default: RequestStatus.PENDING})
    status: RequestStatus;

}
export const ProjectRequestSchema = SchemaFactory.createForClass(ProjectRequest);