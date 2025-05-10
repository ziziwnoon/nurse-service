import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])] ,
  controllers: [PatientController],
  providers: [PatientService],
  exports : [PatientService]
})
export class PatientModule {}
