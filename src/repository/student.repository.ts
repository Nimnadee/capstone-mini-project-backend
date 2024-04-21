import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Student } from "../model/schema/student";
import { Model } from "mongoose";

@Injectable()
export class StudentRepository {

	public constructor(@InjectModel(Student.name) private readonly studentModel: Model<Student>) {}

	public async find(student: Student): Promise<Student> {
		return this.studentModel.findById(student._id);
	}

	public async findById(id: string): Promise<Student> {
		return this.studentModel.findById(id);
	}

	public async findAll(): Promise<Student[]> {
		return this.studentModel.find();
	}

	public async create(student: Student): Promise<Student> {
		return this.studentModel.create(student);
	}
}
