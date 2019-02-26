import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { ChatWindow } from '../models/chatWindow.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chatWindow: ChatWindow;
  newMessage: Message;

  private chatWindowSubscription: Subscription;

  constructor(private messageService: MessagesService) {
  }

  ngOnInit() {
    this.newMessage = {
      id: 'dummyId',
      userId: 'a@a.com',
      message: 'asdf',
      timeStamp: 0,
      photo: undefined
    };

    this.chatWindowSubscription = this.messageService.currentChatWindow$
      .subscribe(chatWindow => {
        this.chatWindow = chatWindow;
      });
  }

  ngOnDestroy() {
    this.chatWindowSubscription.unsubscribe();
  }

  editDoc() {
    this.messageService.editChatWindow(this.chatWindow);
  }

  send() {
    console.log(this.newMessage);
    // this.messageService.sendNewMessage(this.newMessage);
    this.newMessage.timeStamp = Date.now();
    this.messageService.sendNewMessage( this.newMessage, this.chatWindow);
  }
}
