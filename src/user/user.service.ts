import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    async create(data: CreateUserDto) {
        return this.model.create(data);
    }

    async findByEmail(email: string) {
        return this.model.findOne({ email });
    }

    async findById(id: string) {
        return this.model.findById(id);
  }
}
