import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../model/schema/student';
import {  PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { GuideSchema } from 'src/model/schema/guide';
 


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
    MongooseModule.forFeature([{name:'Student' , schema: StudentSchema},{name:'Guide' , schema: GuideSchema}])
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
            PassportModule
          ]
})
export class AuthModule {}
