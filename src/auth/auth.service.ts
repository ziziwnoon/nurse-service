import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NurseService } from 'src/nurse/nurse.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly nurseService: NurseService,
      ) {}
    
      async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException('Invalid email or password');
        }
        return user;
      }
    
      async login(loginDto: LoginDto) {
        const {email , password} = loginDto
        const user = await this.validateUser(email, password);
        if (!user) return null;
        const payload = { sub: user._id, role: user.role };
        return {
          access_token: this.jwtService.sign(payload , {secret : process.env.JWT_SECRET}),
        };
      }
    
      async register(registerDto: RegisterDto) {
        const {email , name ,password ,role} = registerDto
        const exists = await this.userService.findByEmail(email);
        if (exists) throw new UnauthorizedException('User already exists');
    
        const hashed = await bcrypt.hash(password, 10);
        const newUser = await this.userService.create({
          name,
          email,
          password: hashed,
          role,
        });
    
        if (role === 'nurse') {
          await this.nurseService.createProfile(newUser._id);
        }
    
        return {
            status : HttpStatus.CREATED ,
            message : "با موفقیت ثبت نام شدید"
        }
      }
}
