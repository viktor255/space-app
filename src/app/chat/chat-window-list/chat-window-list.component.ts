import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chat-window-list',
  templateUrl: './chat-window-list.component.html',
  styleUrls: ['./chat-window-list.component.css']
})
export class ChatWindowListComponent implements OnInit, OnDestroy {

  chatWindows$: Observable<string[]>;
  currentChatWindowId: string;
  private _chatWindowSub: Subscription;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.chatWindows$ = this.messagesService.chatWindows$;
    this._chatWindowSub = this.messagesService.currentChatWindow$.subscribe(doc => this.currentChatWindowId = doc.id);
  }

  ngOnDestroy() {
    this._chatWindowSub.unsubscribe();
  }

  loadChatWindow(id: string) {
    this.messagesService.getChatWindow(id);
  }

  newChatWindow() {
    this.messagesService.newChatWindow();
  }
}
