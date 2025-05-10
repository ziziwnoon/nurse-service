import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleEnum } from 'src/common/enum/role.enum';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class PatientService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    async findPatientById(id: string){
        const patient = this.model.findOne({_id : id , role: RoleEnum.PATIENT })
        return patient
    }
}
