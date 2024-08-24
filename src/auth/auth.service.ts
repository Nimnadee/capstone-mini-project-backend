 
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { StudentRequestDto } from '.././model/dto/request/student.dto';
import { LoginDto } from './dto/login';
import { Student } from 'src/model/schema/student';
import { Guide } from 'src/model/schema/guide';
import { TechnologyRepository } from '../repository/technology.repository';
import { GuideRequestDto } from 'src/model/dto/request/guide.dto';
import { CategoryRepository } from 'src/repository/category.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    private jwtService: JwtService,
    @InjectModel(Guide.name)
    private guideModel: Model<Guide>,
    private readonly technologyRepository: TechnologyRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {secret: process.env.JWT_SECRET, expiresIn: '3h' });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' });
  }

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

    async signUpGuide(signUpDto: GuideRequestDto ): Promise<{ message: string; token?: string ; id?: string}> {
    const { email, password, technologies, categories } = signUpDto;
    const existingUserasGuide = await this.guideModel.findOne({ email });
    const existingUserasStudent = await this.studentModel.findOne({ email });
    if (existingUserasGuide) {
      return { message: 'You are already signed up as a guide. Please log in!' };
    }
    if (existingUserasStudent) {
      return { message: 'You are already signed up as a student. Please log in as a student!' };
    }

    const savedTechnologies = await Promise.all(
      technologies.map(async (id) => {
        return await this.technologyRepository.findById(id); 
      })
    );

    const saveCategories = await Promise.all(
      categories.map(async (id) => {
        return await this.categoryRepository.findById(id);
      })
    )
    const hashedPassword = await bcrypt.hash(password, 10);
    const guide = new this.guideModel({ ...signUpDto, password:hashedPassword,technologies: savedTechnologies ,categories: saveCategories});

    await guide.save();
    return { id: guide._id.toString(), message:'Singup Successfull!',
        
     };
  }
  

  async loginStudent(loginDto: LoginDto): Promise<{ id: string; accessToken: string; refreshToken: string; email: string; firstName: string }> {
    const { email, password } = loginDto;
    const student = await this.studentModel.findOne({ email });

    if (!student) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, student.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
 


    const payload = { id: student._id.toString(), role: 'student' };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { id: student._id.toString(),
             accessToken,
             refreshToken,
             email: student.email,
             firstName: student.firstName, 
            };
  }

  async loginGuide(loginDto: LoginDto): Promise<{id: string;  accessToken: string; refreshToken: string;  }> {
    const { email, password } = loginDto;
    const guide = await this.guideModel.findOne({ email });

    if (!guide) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, guide.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: guide._id.toString(), role: 'guide' };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {id: guide._id.toString(),accessToken,refreshToken,};
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET});
      const accessToken = this.generateAccessToken({ id: payload.id, role: payload.role });
      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
