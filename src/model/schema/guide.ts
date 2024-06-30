import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import {Technology} from "./technology";

@Schema({ collection: "guide" })
export class Guide {

    public _id: Types.ObjectId;

    @Prop({ required: true })
	public firstName: string;

	@Prop({ required: true })
	public lastName: string;

	@Prop({ required: true })
	public email: string;

	@Prop({ required: true })
	public password: string;

	@Prop({ required: false })
	public ProfilePic: string;
	
	@Prop({ required: false })
	public job: string;

	@Prop({ required: false})
	public about: string;

	@Prop({ required: false })
	public milestones: string;

	@Prop({ required: false })
	public SocialMediaLinks: string;

	@Prop({ required: true})
	public technologies:Array<Technology>;

}
export const GuideSchema = SchemaFactory.createForClass(Guide);