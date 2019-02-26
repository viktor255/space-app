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

  newChatWindow() {
    this.socket.emit('addChatWindow', {
      id: this.generateChatWindowId(),
      messages: [],
    });
  }

  editChatWindow(chatWindow: ChatWindow) {
    this.socket.emit('editChatWindow', chatWindow);
  }

  sendNewMessage(message: Message, chatWindow: ChatWindow) {
    this.socket.emit('newMessage', {
      chatWindow: chatWindow,
      message: message
    });
  }

  private generateChatWindowId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }


}
