import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res} from "@nestjs/common";
import {Public} from "../auth/auth.decorator";
import {ProjectRequestRequestDto} from "../model/dto/request/project.request..dto.";
import {Response} from "express";
import {ProjectRequestService} from "../service/project.request.service";


@Controller("/projectRequests")
@Public()
export class ProjectRequestController {
    constructor(private readonly projectRequestService: ProjectRequestService) {}

    @Post()
    public async  create(@Body() projectRequestRequestDto: ProjectRequestRequestDto,@Res()  response: Response){
        const result =await this.projectRequestService.create(projectRequestRequestDto);
        response.set(HttpStatus.CREATED).send(result);
    }
    @Get()
    public async findAll(@Res() response: Response) {
        const result = await this.projectRequestService.findAll();
        response.set(HttpStatus.OK).send(result);
    }


    //get project requests by guideID( returns project requests that status=== pending only)
    @Get("/:guideId")
    public async getRequestsByGuide(@Param('guideId') guideId: string, @Res() response: Response) {
        const result = await this.projectRequestService.getRequestsByGuide(guideId);
        response.set(HttpStatus.OK).send(result);
    }

    @Get("projectId/:projectId")
    public async getRequestsByProject(@Param('projectId') projectId: string, @Res() response: Response) {
        const result = await this.projectRequestService.getRequestsByProject(projectId);
        response.set(HttpStatus.OK).send(result);
    }


//     	@Post()
// 	public async create(@Body() studentRequestDto: StudentRequestDto, @Res() response: Response) {
// 		const result = await this.studentService.create(studentRequestDto);
// 		response.set(HttpStatus.CREATED).send(result);
// 	}

    @Delete("/:id")
    public async delete(@Param() params: any, @Res() response: Response) {
        const result = await this.projectRequestService.delete(params.id);
        response.set(HttpStatus.NO_CONTENT).send(result);
    }
    @Patch(':id/reject')
    public async rejectRequest(@Param('id') id: string, @Res() response: Response){
        const result = await this.projectRequestService.rejectRequest(id);
        response.set(HttpStatus.OK).send(result);
    }

    @Patch(':id/accept')
    public async acceptRequest(@Param('id') id: string, @Res() response: Response){
        const result = await this.projectRequestService.acceptRequest(id);
        response.set(HttpStatus.OK).send(result);
    }
    @Get("/:id/projectFinalStatus")
    public async getFinalStatusOfProject(@Param() params: any, @Res() response: Response) {
        const result= await this.projectRequestService.getFinalStatusOfProject(params.id);
        response.set(HttpStatus.OK).send(result.toString());

    }
    @Get("/:id/acceptedGuideID")
    public async getAcceptedGuideIdByProjectId(@Param() params: any, @Res() response: Response) {
        const result= await this.projectRequestService.getAcceptedGuideIdByProjectId(params.id);
        response.set(HttpStatus.OK).send(result.toString());

    }
    @Get("/:id/rejectedGuidesIds")
    public async getRejectedGuideIdsByProjectId(@Param() params: any, @Res() response: Response) {
        const result= await this.projectRequestService.getRejectedGuideIdsByProjectId(params.id);
        console.log("result",result);
        response.set(HttpStatus.OK).send(result);

    }

}
