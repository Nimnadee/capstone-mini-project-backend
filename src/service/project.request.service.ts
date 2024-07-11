import {Injectable} from "@nestjs/common";
import {ProjectRequestRequestDto} from "../model/dto/request/project.request..dto.";
import {ProjectRequest} from "../model/schema/project.request";
import {ProjectRequestMapper} from "../mapper/project.request.mapper";
import {ProjectRequestRepository} from "../repository/project.request.repository";
import {ProjectRequestResponseDto} from "../model/dto/response/project.request.dto";


@Injectable()
export class ProjectRequestService {
    constructor(private readonly projectRequestMapper: ProjectRequestMapper,
                private readonly projectRequestRepository: ProjectRequestRepository) {
    }

    // public async create(guideRequestDto: GuideRequestDto): Promise<GuideResponseDto> {
    //     let guide: Guide = await this.guideMapper.guideRequestDtoToGuide(guideRequestDto);
    //     guide = await this.guideRepository.create(guide);
    //     return this.guideMapper.guideToGuideResponseDto(guide);
    // }

    public async create(projectRequestRequestDto: ProjectRequestRequestDto) {
        let projectRequest: ProjectRequest = ProjectRequestMapper.projectRequestRequestDtoToProjectRequest(projectRequestRequestDto);
        projectRequest = await this.projectRequestRepository.create(projectRequest);
        return ProjectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
    }

    // public async findAll(): Promise<StudentResponseDto[]> {
    // 		const students: Student[] = await this.studentRepository.findAll();
    // 		return students.map(s => StudentMapper.studentToStudentResponseDto(s))
    // 	}
    public async getRequestsByGuide(guideId: string): Promise<ProjectRequestResponseDto[]> {
        const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findByGuideId(guideId);
        return projectRequests.map(s => ProjectRequestMapper.projectRequestToProjectRequestResponseDto(s))
    }
    public async getRequestsByProject(projectId: string): Promise<ProjectRequestResponseDto[]> {
        const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findByProjectId(projectId);
        return projectRequests.map(s => ProjectRequestMapper.projectRequestToProjectRequestResponseDto(s))
    }

    // public async findAll(): Promise<ProjectRequestResponseDto[]> {
    //     const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findAll();
    //     return projectRequests.map(s => ProjectRequestMapper.projectRequestToProjectRequestResponseDto(s))
    // }

    public async rejectRequest(requestId: string): Promise<ProjectRequestResponseDto> {
        const projectRequest: ProjectRequest = await this.projectRequestRepository.rejectRequest(requestId);
        return ProjectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
    }

    public async acceptRequest(requestId: string): Promise<ProjectRequestResponseDto> {
        const projectRequest: ProjectRequest= await this.projectRequestRepository.acceptRequest(requestId);
       return ProjectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
         // return projectRequests.map(s => ProjectRequestMapper.projectRequestToProjectRequestResponseDto(s));

    }

}