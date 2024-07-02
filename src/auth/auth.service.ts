import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { StudentRequestDto } from '../model/dto/request/student.dto';
import { LoginDto } from './dto/login';
import { Student } from 'src/model/schema/student';
import { Guide } from 'src/model/schema/guide';

//     const token = this.jwtService.sign({ id: user._id });
//     return { token };
 
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name) 
    private studentModel: Model<Student>,
    private jwtService: JwtService,

    @InjectModel(Guide.name)
    private guideModel: Model<Guide>
  ) {}

  async signUpStudent(signUpDto: StudentRequestDto ): Promise<{ message: string; token?: string }> {
    const { email, password } = signUpDto;
    const existingUserasGuide = await this.guideModel.findOne({ email });
    const existingUserasStudent = await this.studentModel.findOne({ email });
    if (existingUserasGuide) {
      return { message: 'You are already signed up as a guide. Please log in!' };
    }
    if (existingUserasStudent) {
      return { message: 'You are already signed up as a student. Please log in as a guide!' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new this.studentModel({ ...signUpDto, password: hashedPassword });

    await student.save();
    return { message: 'Signup successful, you can login now!' };
  }

  async loginStudent(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const student = await this.studentModel.findOne({ email });

    if (!student) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, student.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: student._id });
    return { token };
  }

  async signUpGuide(signUpDto: StudentRequestDto ): Promise<{ message: string; token?: string }> {
    const { email, password } = signUpDto;
    const existingUserasGuide = await this.guideModel.findOne({ email });
    const existingUserasStudent = await this.studentModel.findOne({ email });
    if (existingUserasGuide) {
      return { message: 'You are already signed up as a guide. Please log in!' };
    }
    if (existingUserasStudent) {
      return { message: 'You are already signed up as a student. Please log in as a student!' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const guide = new this.guideModel({ ...signUpDto, password: hashedPassword });

    await guide.save();
    return { message: 'Signup successful, you can login now!' };
  }

  async loginGuide(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const guide = await this.guideModel.findOne({ email });

    if (!guide) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, guide.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: guide._id });
    return { token };
  }
}