import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Socket } from 'ngx-socket-io';
import { ChatWindow } from '../models/chatWindow.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  currentChatWindow$ = this.socket.fromEvent<ChatWindow>('chatWindow');
  chatWindows$ = this.socket.fromEvent<string[]>('chatWindows');

  constructor(private socket: Socket) {
  }

  getChatWindow(id: string) {
    this.socket.emit('getChatWindow', id);
  }


  sendNewMessage(message: Message, chatWindow: ChatWindow) {
    this.socket.emit('newMessage', {
      chatWindow: chatWindow,
      message: message
    });
  }


}
