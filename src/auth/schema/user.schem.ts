// user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Technology } from 'src/model/schema/technology';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['student', 'guide'] })
  role: string;

  @Prop() 
  profilePic?: string;

  @Prop() 
  job?: string;

  @Prop() 
  about?: string;

  @Prop() 
  milestones?: string;
  
  @Prop() 
  socialMediaLinks?: string;

  @Prop({ required: true})
	public technologies:Array<Technology>;
}

export const UserSchema = SchemaFactory.createForClass(User);
