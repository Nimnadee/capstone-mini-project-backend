import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentRequestDto } from '../model/dto/request/student.dto';
import { GuideRequestDto } from '../model/dto/request/guide.dto';
import { LoginDto } from './dto/login';
import { Roles } from './role.decorder';
import { RolesGuard } from './role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/student')
  signUpStudent(@Body() signUpDto: StudentRequestDto) {
    signUpDto.role = 'student'; // Set role for student
    return this.authService.signUp(signUpDto);
  }

  @Post('/signup/guide')
  signUpGuide(@Body() signUpDto: GuideRequestDto) {
    signUpDto.role = 'guide'; // Set role for guide
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/protected')
  @Roles('guide') // Only guides can access this endpoint
  @UseGuards(RolesGuard)
  protectedEndpoint() {
    // Logic for protected endpoint
  }
}
