import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { NurseModule } from 'src/nurse/nurse.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    NurseModule ,
    UserModule
  ] ,
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
