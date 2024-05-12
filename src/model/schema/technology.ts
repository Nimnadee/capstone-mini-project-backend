import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import {TechType} from "../../util/tech.type";


@Schema({ collection: "technology" })
export class Technology{
    public _id: Types.ObjectId;


@Prop({required:true})
    public technologyType:TechType;

@Prop({required:true})
    public technologyName:string;

}
export const TechnologySchema = SchemaFactory.createForClass(Technology);