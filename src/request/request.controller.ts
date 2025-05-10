import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { User } from 'src/common/decorator/user.decorator';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('patient')
  @Post("add")
  async createRequest(
    @User('id') userId: string ,
    @Body('description') description: string, 
  ) {
    return await this.requestService.createRequest(description , userId);
  }
}
