import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '.././model/schema/student';
import {  PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { GuideSchema } from 'src/model/schema/guide';
import { TechnologyRepository } from 'src/repository/technology.repository';
import { TechnologyModule } from 'src/technology.module';
 


@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config:ConfigService)=>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn: config.get<string | number >('JWT_EXPIRES'),
          }
        }
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('REFRESH_TOKEN_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('REFRESH_TOKEN_EXPIRES'), // Default to 7 days if not set
          },
        };
      },
      global: true,  
    }),
    MongooseModule.forFeature([{name:'Student' , schema: StudentSchema},{name:'Guide' , schema: GuideSchema}])
  ,TechnologyModule,
 ],
  controllers: [AuthController],
  providers: [
              AuthService,
              {
                provide: APP_GUARD,
                useClass: AuthGuard,
              } 
            ],
  exports:[            
            PassportModule,
            JwtModule,  
            AuthService
          ]
})
export class AuthModule {}
