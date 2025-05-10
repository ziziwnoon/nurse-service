import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { Types } from "mongoose";
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from "@nestjs/common";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private onlineUsers = new Map<string, Socket>();

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;
  
    if (!token) {
      console.warn('Connection rejected: Missing token');
      return client.disconnect();
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET); 
      const userId = decoded.sub;
      const role = decoded.role;
  
      if (!userId || !role) throw new UnauthorizedException('Invalid token');
  
      this.onlineUsers.set(userId, client);
      console.log(`User ${userId} (${role}) connected`);
  
      const messages = await this.chatService.getUndeliveredMessages(userId);
      for (const msg of messages) {
        client.emit('receive_message', {
          senderId: msg.senderId,
          content: msg.content,
        });
        await this.chatService.markAsDelivered(msg._id as Types.ObjectId);
      }
  
      client.data = { userId, role };
  
    } catch (err) {
      console.warn('Invalid token:', err.message);
      return client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    const userEntry = [...this.onlineUsers.entries()].find(([, socket]) => socket === client);
    if (userEntry) {
      const [userId] = userEntry;
      this.onlineUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() payload: { receiverId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;
    const { receiverId, content } = payload;
  
    const message = await this.chatService.saveMessage(senderId, receiverId, content);
  
    const receiverSocket = this.onlineUsers.get(receiverId);
    if (receiverSocket) {
      receiverSocket.emit('receive_message', { senderId, content });
      await this.chatService.markAsDelivered(message._id as Types.ObjectId);
    }
  }
  
}