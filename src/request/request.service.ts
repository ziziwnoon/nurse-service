import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { RequestStatus } from 'src/common/enum/requestStatus.enum';
import { NurseService } from 'src/nurse/nurse.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class RequestService {
    constructor(
        @InjectModel(Request.name)
        private model: Model<Request>,
        private readonly nurseService: NurseService,
        private readonly patientService: PatientService,
      ) {}
    
      async createRequest(description: string , patientId: string) {
        const patient = await this.patientService.findPatientById(patientId); 
        if (!patient) throw new NotFoundException('Patient not found or invalid role');


        const nurse = await this.nurseService.getAvailableNurses();
        if (!nurse.length) throw new NotFoundException('No available nurse found');
    
        const selected = nurse[Math.floor(Math.random() * nurse.length)];
    
        await this.nurseService.markUnavailable(selected.userId);
    
        const request = new this.model({
            patient: patientId, 
            description,
            status : RequestStatus.INPROGRESS ,
            nurse : selected._id ,
            createdAt: new Date(),
        });

        await request.save();

        console.log(`Assigned nurse ${selected.userId} to patient ${patientId}`);
    
        return request;
      }
}
