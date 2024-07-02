import {Injectable} from "@nestjs/common";
import {ProjectRequestRequestDto} from "../model/dto/request/project.request..dto.";
import {ProjectRequest} from "../model/schema/project.request";
import {ProjectRequestResponseDto} from "../model/dto/response/project.request.dto";

@Injectable()
export class ProjectRequestMapper {

    constructor() {
    }

    public static projectRequestToProjectRequestResponseDto(projectRequest: ProjectRequest) {
        const projectRequestResponseDto: ProjectRequestResponseDto = new ProjectRequestResponseDto();
        projectRequestResponseDto.id = projectRequest._id.toString()
        projectRequestResponseDto.guideId = projectRequest.guideId;
        projectRequestResponseDto.projectId = projectRequest.projectId;
        projectRequestResponseDto.status = projectRequest.status;

        return projectRequestResponseDto;
    }

    public static projectRequestRequestDtoToProjectRequest(projectRequestRequestDto: ProjectRequestRequestDto) {
        const projectRequest: ProjectRequest = new ProjectRequest();
        projectRequest.guideId = projectRequestRequestDto.guideId;
        projectRequest.projectId = projectRequestRequestDto.projectId;
        projectRequest.status = projectRequestRequestDto.status;


        return projectRequest;
    }


}