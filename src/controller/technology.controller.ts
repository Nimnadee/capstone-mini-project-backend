import {TechnologyService} from "../service/technology.service";
import {Body, Controller, Get, HttpStatus, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {TechnologyRequestDto} from "../model/dto/request/technology.dto";


@Controller("/technology")
export class TechnologyController {
    constructor(private technologyService: TechnologyService) {}

    @Get()
    public async findAll(@Res() response: Response)
    {
        const result = await this.technologyService.findAll();
        response.set(HttpStatus.OK).send(result);
    }

    @Post()
    public async create(@Body() technologyRequestDto: TechnologyRequestDto, @Res() response: Response) {
        const result = await this.technologyService.create(technologyRequestDto);
        response.set(HttpStatus.CREATED).send(result);
    }

}