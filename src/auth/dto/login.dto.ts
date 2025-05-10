import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { RoleEnum } from "src/common/enum/role.enum";

export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
  }