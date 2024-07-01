import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { StudentRequestDto } from '../model/dto/request/student.dto';
import { GuideRequestDto } from '../model/dto/request/guide.dto';
import { LoginDto } from './dto/login';
import { User, UserDocument } from '../auth/schema/user.schem';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: StudentRequestDto | GuideRequestDto): Promise<{ message: string; token?: string }> {
    const { email, password } = signUpDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return { message: 'You are already signed up. Please log in.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ ...signUpDto, password: hashedPassword });

    await user.save();
    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { message: 'Signup successful', token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id, role: user.role });
    return { token };
  }
}
