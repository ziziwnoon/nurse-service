import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/chat.schema';
import { ChatGateway } from './chat.gateway';
import { ConversationSchema } from './schema/conversation.schema';

@Module({
  imports : [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema } , { name: 'Conversation', schema: ConversationSchema }])] ,
  controllers: [ChatController],
  providers: [ChatService , ChatGateway],
})
export class ChatModule {}
