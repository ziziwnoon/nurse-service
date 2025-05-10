import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { RoleEnum } from "src/common/enum/role.enum"


export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
  
    @IsEnum(RoleEnum)
    role: RoleEnum;
  }