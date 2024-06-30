import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../model/schema/student';
import {  PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './Jwt.strategy';
import { UserSchema } from './schema/user.schem';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
 


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
    MongooseModule.forFeature([{name:'User' , schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [
              AuthService,
            //   JwtStrategy,
              {
                provide: APP_GUARD,
                useClass: AuthGuard,
              } 
            ],
  exports:[
            // JwtStrategy,
            PassportModule]
})
export class AuthModule {}
