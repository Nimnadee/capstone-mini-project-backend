import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Student } from "./student";
import {Technology} from "./technology";
import { Guide } from "./guide";



@Schema({ collection: "project" })
export class Project {

	public _id: Types.ObjectId;

	@Prop({ required: true })
	public title: string;

	@Prop({ required: true })
	public summary: string;

	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Student'})
	public student: Student;

	@Prop({ required: false})
	public technologies:Array<Technology>;

	@Prop({ required: false, type: SchemaTypes.ObjectId, ref: 'Guide'})
	public guide: Guide;



}

export const ProjectSchema = SchemaFactory.createForClass(Project);
