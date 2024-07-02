import {RequestStatus} from "../../../util/project.request.status";


export class ProjectRequestResponseDto {
    public id: string;
    guideId: string;
    projectId: string;
    status: RequestStatus;
}