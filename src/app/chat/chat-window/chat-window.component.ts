import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { ChatWindow } from '../models/chatWindow.model';
import { select, Store } from '@ngrx/store';
import { emailSelector } from '../../auth/auth.selector';
import { AppState } from '../../reducers';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  chatWindow: ChatWindow;
  newMessage: Message;

  private chatWindowSubscription: Subscription;
  private _userEmailSub: Subscription;
  private userEmail: string;

  constructor(private messageService: MessagesService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.newMessage = {
      id: 'dummyId',
      userId: 'dummy',
      message: '',
      timeStamp: 0,
      photo: undefined
    };

    this.chatWindowSubscription = this.messageService.currentChatWindow$
      .subscribe(chatWindow => {
        this.chatWindow = chatWindow;
        // console.log('currentChat changed');
      });
    this._userEmailSub = this.store.pipe(select(emailSelector)).subscribe(email => {
        this.userEmail = email;
        this.newMessage.userId = email;
      }
    );
  }

  ngOnDestroy() {
    this.chatWindowSubscription.unsubscribe();
    this._userEmailSub.unsubscribe();
  }

  send() {
    console.log(this.newMessage);
    // this.messageService.sendNewMessage(this.newMessage);
    this.newMessage.timeStamp = Date.now();
    this.messageService.sendNewMessage(this.newMessage, this.chatWindow);
  }
}
