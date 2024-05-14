import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "category" })
export class Category {

	public _id: Types.ObjectId;

	@Prop({ required: true })
	public categoryName: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

