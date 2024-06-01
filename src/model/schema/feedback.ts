import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Student } from "./student";
import { Guide } from "./guide";
@Schema({ collection: "feedback" })
export class Feedback {

	public _id: Types.ObjectId;

	@Prop({ required: true })
	public content: string;

	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Student'})
	public student: Student;

    @Prop({ default: Date.now }) 
    public createdAt: Date;
 
	@Prop({ required: true })
    public rating: number;

    @Prop({ required: true , type: SchemaTypes.ObjectId, ref: 'Guide'})
    public guide: Guide;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);