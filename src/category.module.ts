import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './model/schema/category';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),  
  ],
  controllers: [CategoryController],
  providers: [ CategoryService, CategoryRepository],
  exports: [CategoryService,  CategoryRepository],  
})
export class CategoryModule {}