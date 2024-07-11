 
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologyController } from './controller/technology.controller';
import { TechnologyService } from './service/technology.service';
import { TechnologyRepository } from './repository/technology.repository';
import { TechnologySchema } from './model/schema/technology'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Technology', schema: TechnologySchema }]),  
  ],
  controllers: [TechnologyController],
  providers: [TechnologyService, TechnologyRepository],
  exports: [TechnologyService, TechnologyRepository],  
})
export class TechnologyModule {}
