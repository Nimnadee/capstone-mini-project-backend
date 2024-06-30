import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as process from "process";
import { Student, StudentSchema } from "./model/schema/student";
import { Project, ProjectSchema } from "./model/schema/project";
import { Category, CategorySchema } from "./model/schema/category";
import { Feedback, FeedbackSchema } from "./model/schema/feedback";
import { Guide, GuideSchema } from "./model/schema/guide";
import { StudentController } from "./controller/student.controller";
import { StudentService } from "./service/student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentMapper } from "./mapper/student.mapper";
import { ProjectController } from "./controller/project.controller";
import { ProjectService } from "./service/project.service";
import { ProjectRepository } from "./repository/project.repository";
import { ProjectMapper } from "./mapper/project.mapper";
import { CategoryController } from "./controller/category.controller";
import { CategoryService } from "./service/category.service";
import { CategoryRepository } from "./repository/category.repository";
import { CategoryMapper } from "./mapper/category.mapper";
import { FeedbackController } from "./controller/feedback.controller";
import { FeedbackService } from "./service/feedback.service";
import { FeedbackRepository } from "./repository/feedback.repository";
import { FeedbackMapper } from "./mapper/feedback.mapper";
import { GuideController } from "./controller/guide.controller";
import { GuideService } from "./service/guide.service";
import { GuideRepository } from "./repository/guide.repository";
import { GuideMapper } from "./mapper/guide.mapper";
import {TechnologyController} from "./controller/technology.controller";
import {TechnologyService} from "./service/technology.service";
import {TechnologyMapper} from "./mapper/technology.mapper";
import {TechnologyRepository} from "./repository/technology.repository";
import {Technology, TechnologySchema} from "./model/schema/technology";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot(
			{
			envFilePath:'.env',
			isGlobal:true 
			}),
		MongooseModule.forRoot(process.env.MONGO_HOST, {
			dbName: process.env.MONGO_DATABASE_NAME
		}),
		MongooseModule.forFeature([
			{name: Student.name, schema: StudentSchema},
			{name: Project.name, schema: ProjectSchema},
			{name: Category.name, schema: CategorySchema},
			{name: Feedback.name, schema: FeedbackSchema},
			{name: Guide.name, schema: GuideSchema},
			{name: Technology.name,schema: TechnologySchema}
		]),
		AuthModule,
	],
	controllers: [
		StudentController,
		ProjectController,
		CategoryController,
		FeedbackController,
		GuideController,
		TechnologyController
	],
	providers: [
		StudentService,
		StudentRepository,
		StudentMapper,
		ProjectService,
		ProjectRepository,
		ProjectMapper,
		CategoryService,
		CategoryRepository,
		CategoryMapper,
		FeedbackService,
		FeedbackRepository,
		FeedbackMapper,
		GuideService,
		GuideRepository,
		GuideMapper,
		TechnologyService,
		TechnologyRepository,
		TechnologyMapper,
	]
})
export class AppModule {}
