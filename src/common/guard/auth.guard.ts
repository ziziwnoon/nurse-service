import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });     
        req.user = {
            id: payload.sub, 
            role: payload.role,
        };
        return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
