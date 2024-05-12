import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as process from "process";
import { Student, StudentSchema } from "./model/schema/student";
import { Project, ProjectSchema } from "./model/schema/project";
import { Feedback, FeedbackSchema } from "./model/schema/feedback";
import { StudentController } from "./controller/student.controller";
import { StudentService } from "./service/student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentMapper } from "./mapper/student.mapper";
import { ProjectController } from "./controller/project.controller";
import { ProjectService } from "./service/project.service";
import { ProjectRepository } from "./repository/project.repository";
import { ProjectMapper } from "./mapper/project.mapper";
import { FeedbackController } from "./controller/feedback.controller";
import { FeedbackService } from "./service/feedback.service";
import { FeedbackRepository } from "./repository/feedback.repository";
import { FeedbackMapper } from "./mapper/feedback.mapper";


@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_HOST,{
			dbName: process.env.MONGO_DATABASE_NAME
		}),
		MongooseModule.forFeature([
			{name: Student.name, schema: StudentSchema},
			{name: Project.name, schema: ProjectSchema},
			{name: Feedback.name, schema: FeedbackSchema}
		])
	],
	controllers: [
		StudentController,
		ProjectController,
		FeedbackController
	],
	providers: [
		StudentService,
		StudentRepository,
		StudentMapper,
		ProjectService,
		ProjectRepository,
		ProjectMapper,
		FeedbackService,
		FeedbackRepository,
		FeedbackMapper
	]
})
export class AppModule {}
