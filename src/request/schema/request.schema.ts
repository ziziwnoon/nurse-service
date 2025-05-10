import { Prop, Schema , SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RequestStatus } from 'src/common/enum/requestStatus.enum';


@Schema()
export class Request {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  patient: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  nurse: Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
