import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { NurseModule } from './nurse/nurse.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI) ,
    PatientModule,
    UserModule,
    NurseModule,
    AuthModule,
    RequestModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
