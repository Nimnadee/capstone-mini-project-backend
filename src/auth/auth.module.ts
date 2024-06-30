import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../model/schema/student';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './Jwt.strategy';
import { UserSchema } from './schema/user.schem';
import { RolesGuard } from './role.guard';


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
  providers: [AuthService,JwtStrategy,RolesGuard],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
