import { Module } from '@nestjs/common';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NurseProfileSchema } from './schema/nurse.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'NurseProfile', schema: NurseProfileSchema }])] ,
  controllers: [NurseController],
  providers: [NurseService],
  exports : [NurseService]
})
export class NurseModule {}
