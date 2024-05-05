import {TechnologyService} from "../service/technology.service";


import {Controller, Get, HttpStatus, Res} from "@nestjs/common";
import {Response} from "express";


@Controller("/technology")
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    @Get()
    public async findAll(@Res() response: Response)
    {
        const result = await this.technologyService.findAll();
        response.set(HttpStatus.OK).send(result);
    }
}