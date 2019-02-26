import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { select, Store } from '@ngrx/store';
import { emailSelector } from '../../auth/auth.selector';
import { AppState } from '../../reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  @Input() message: Message;
  public userEmail: string;
  public _userEmailSub: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this._userEmailSub = this.store.pipe(select(emailSelector)).subscribe(email => this.userEmail = email);
  }

  ngOnDestroy() {
    this._userEmailSub.unsubscribe();
  }

  calculateClasses() {
    // console.log(userData);
    if (this.message.userId !== this.userEmail) {
      return 'other';
    }
    return '';
  }

}
