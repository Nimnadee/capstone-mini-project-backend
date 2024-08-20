import {Injectable} from "@nestjs/common";
import {ProjectRequestRequestDto} from "../model/dto/request/project.request..dto.";
import {ProjectRequest} from "../model/schema/project.request";
import {ProjectRequestResponseDto} from "../model/dto/response/project.request.dto";
import {GuideService} from "../service/guide.service";
import {ProjectService} from "../service/project.service";

@Injectable()
export class ProjectRequestMapper {

    constructor(private readonly guideService: GuideService,
                private readonly projectService: ProjectService) {
    }

    public async projectRequestToProjectRequestResponseDto(projectRequest: ProjectRequest) {
        const guide = await this.guideService.findById(projectRequest.guideId.toString());
        const project = await this.projectService.findById(projectRequest.projectId);
        const projectRequestResponseDto: ProjectRequestResponseDto = new ProjectRequestResponseDto();
        projectRequestResponseDto.id = projectRequest._id.toString()
        projectRequestResponseDto.guideId = projectRequest.guideId;
        projectRequestResponseDto.projectId = projectRequest.projectId;
        projectRequestResponseDto.status = projectRequest.status;

        if (guide) {
            projectRequestResponseDto.guideEmail = guide.email;
        } else {
            projectRequestResponseDto.guideEmail = "Guide not found";
        }


        if (project) {
            projectRequestResponseDto.projectSummary = project.summary;
            projectRequestResponseDto.projectTitle = project.title;
            projectRequestResponseDto.studentEmail = project.student.email;
        } else {
            // Handle cases where the project isn't found
            projectRequestResponseDto.projectSummary = "Project not found";
            projectRequestResponseDto.projectTitle = "Project not found";
            projectRequestResponseDto.studentEmail = "Student email not found";
        }




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