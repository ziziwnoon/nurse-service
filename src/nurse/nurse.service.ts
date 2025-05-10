import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NurseProfile } from './schema/nurse.schema';
import { Model } from 'mongoose';

@Injectable()
export class NurseService {
    constructor(
        @InjectModel(NurseProfile.name)
        private model: Model<NurseProfile>,
    ) {}
    
    async createProfile(userId: any) {
    return this.model.create({ userId, isAvailable: true });
    }

    async getAvailableNurses() {
    return this.model.find({ isAvailable: true }).populate('userId');
    }

    async markUnavailable(userId: string) {
    return this.model.updateOne({ userId }, { isAvailable: false });
    }
}
