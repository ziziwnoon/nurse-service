import { Module, Scope } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './schema/request.schema';
import { NurseModule } from 'src/nurse/nurse.module';
import { PatientModule } from 'src/patient/patient.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]) ,
      NurseModule ,
      PatientModule
  ] ,
  controllers: [RequestController],
  providers: [RequestService , JwtService],
})
export class RequestModule {}
