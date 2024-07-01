import {Body, Controller, Get, Post,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentRequestDto } from '../model/dto/request/student.dto';
import { GuideRequestDto } from '../model/dto/request/guide.dto';
import { LoginDto } from './dto/login';
import { Public } from './auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup/student')
  signUpStudent(@Body() signUpDto: StudentRequestDto) {
    return this.authService.signUp({ ...signUpDto, role: 'student' });
  }
  
  @Public()
  @Post('/signup/guide')
  signUpGuide(@Body() signUpDto: GuideRequestDto) {
    return this.authService.signUp({ ...signUpDto, role: 'guide' });
  }

  @Public()
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
