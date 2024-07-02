import {Body, Controller, Get, HttpStatus, Param, Post, Res} from "@nestjs/common";
import {Public} from "../auth/auth.decorator";
import {ProjectRequestRequestDto} from "../model/dto/request/project.request..dto.";
import { Response } from "express";
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

    @Get("/guideID")
    public async getRequestsByGuide(@Param() params:any, @Res() response: Response) {
        const result = await this.projectRequestService.getRequestsByGuide(params.guideId);
        response.set(HttpStatus.OK).send(result);
    }

}