import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class NurseProfile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: string;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const NurseProfileSchema = SchemaFactory.createForClass(NurseProfile);
