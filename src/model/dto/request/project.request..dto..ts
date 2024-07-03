// src/dtos/project-request-request.dto.ts
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {RequestStatus} from "../../../util/project.request.status";


export class ProjectRequestRequestDto {
    @IsString()
    @IsNotEmpty()
    guideId: string;

    @IsString()
    @IsNotEmpty()
    projectId: string;


    @IsEnum(RequestStatus)
    @IsNotEmpty()
    status: RequestStatus;
}