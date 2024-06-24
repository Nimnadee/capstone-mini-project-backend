import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { Student } from "./student";
<<<<<<< HEAD



=======
import { Guide } from "./guide";
>>>>>>> 01390587be788f673d77e2d7d65b62f5d4e7afdb
@Schema({ collection: "feedback" })
export class Feedback {

	public _id: Types.ObjectId;

	@Prop({ required: true })
	public content: string;

	@Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Student'})
	public student: Student;

    @Prop({ default: Date.now }) 
    public createdAt: Date;
 
<<<<<<< HEAD
	@Prop({ required: true, min: 1, max: 5 })
     public rating: number;

=======
	@Prop({ required: true })
    public rating: number;

    @Prop({ required: true , type: SchemaTypes.ObjectId, ref: 'Guide'})
    public guide: Guide;
>>>>>>> 01390587be788f673d77e2d7d65b62f5d4e7afdb
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);