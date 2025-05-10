import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation, ConversationDocument } from './schema/conversation.schema';
import { Message, MessageDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async findOrCreateConversation(user1: string, user2: string): Promise<ConversationDocument> {
    const existing = await this.conversationModel.findOne({
      participants: { $all: [user1, user2], $size: 2 },
    });

    if (existing) return existing;

    const conversation = new this.conversationModel({
      participants: [user1, user2],
    });

    return conversation.save();
  }

  async saveMessage(senderId: string, receiverId: string, content: string): Promise<MessageDocument> {
    const conversation = await this.findOrCreateConversation(senderId, receiverId);

    const message = new this.messageModel({
      conversationId: conversation._id,
      senderId,
      receiverId,
      content,
      delivered: false,
    });

    return message.save();
  }

  async getUndeliveredMessages(userId: string): Promise<MessageDocument[]> {
    return this.messageModel.find({
      receiverId: userId,
      delivered: false,
    });
  }

  async markAsDelivered(messageId: Types.ObjectId): Promise<void> {
    await this.messageModel.findByIdAndUpdate(messageId, { delivered: true });
  }
}
