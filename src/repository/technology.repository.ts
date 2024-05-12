import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Technology} from "../model/schema/technology";

@Injectable()
export class TechnologyRepository {

    public constructor(@InjectModel(Technology.name) private readonly technologyModel: Model<Technology>) {}
    public async create(technology: Technology): Promise<Technology> {
        return this.technologyModel.create(technology);
    }
    public async findAll(): Promise<Technology[]> {
        return this.technologyModel.find();
    }

    public async findById(id: string): Promise<Technology> {
        return this.technologyModel.findById(id);
    }

    public async find(technology: Technology): Promise<Technology> {
        return this.technologyModel.findById(technology._id);
    }

}