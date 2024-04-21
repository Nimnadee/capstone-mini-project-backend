import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "student" })
export class Student {

	public _id: Types.ObjectId;

	@Prop({ required: true })
	public firstName: string;

	@Prop({ required: true })
	public lastName: string;

	@Prop({ required: true })
	public email: string;

	@Prop({ required: true })
	public password: string;

}

export const StudentSchema = SchemaFactory.createForClass(Student);
