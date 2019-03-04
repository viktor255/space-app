import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { ChatWindow } from '../models/chatWindow.model';
import { select, Store } from '@ngrx/store';
import { emailSelector } from '../../auth/auth.selector';
import { AppState } from '../../reducers';
import { AllSpaceflightsRequested } from '../../space/spaceflights/spaceflight.actions';
import { AllCosmonautsRequested } from '../../space/cosmonauts/cosmonaut.actions';
import { selectCosmonautByEmail } from '../../space/cosmonauts/cosmonaut.selectors';
import { Cosmonaut } from '../../space/models/cosmonaut.model';
import { selectCosmonautsSpaceflights } from '../../space/spaceflights/spaceflight.selectors';
import { Spaceflight } from '../../space/models/spaceflight.model';
import { selectSpacecraftById } from '../../space/spacecrafts/spacecraft.selectors';
import { AllSpacecraftsRequested } from '../../space/spacecrafts/spacecraft.actions';
import { take } from 'rxjs/operators';

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
  private _cosmonautSub: Subscription;
  private _spaceflightsSub: Subscription;
  private userEmail: string;

  private currentSpaceflight: Spaceflight;

  constructor(private messageService: MessagesService, private store: Store<AppState>) {
  }

  ngOnInit() {

    this.store.dispatch(new AllSpaceflightsRequested());
    this.store.dispatch(new AllCosmonautsRequested());
    this.store.dispatch(new AllSpacecraftsRequested());

    this.newMessage = {
      id: 'dummyId',
      userEmail: 'dummy',
      spaceflightId: '',
      message: '',
      timeStamp: 0,
      photo: undefined
    };

    this._userEmailSub = this.store.pipe(select(emailSelector)).subscribe(email => {
        this.userEmail = email;
        this.newMessage.userEmail = email;

        console.log('Email is: ' + email);
        this._cosmonautSub = this.store.pipe(select(selectCosmonautByEmail(email))).subscribe((cosmonaut: Cosmonaut) => {
          console.log(cosmonaut);
          if (cosmonaut) {
            this._spaceflightsSub = this.store.pipe(select(selectCosmonautsSpaceflights(cosmonaut._id)))
              .subscribe((spaceflights: Spaceflight[]) => {
                  spaceflights.forEach(spaceflight => {
                    this.store.pipe(select(selectSpacecraftById(spaceflight.spacecraftId))).pipe(take(2)).subscribe(spacecraft => {
                      if (spacecraft) {
                        const arriveTime = spaceflight.startTime + (spaceflight.distance / spacecraft.speed) * 60 * 60 * 1000;
                        if (spaceflight.startTime < Date.now() && arriveTime > Date.now()) {
                          console.log('current spaceflight found');
                          this.currentSpaceflight = spaceflight;
                          this.newMessage.spaceflightId = spaceflight._id;
                          this.messageService.getChatWindow(spaceflight._id);
                        }
                      }
                    });
                  });
                }
              );
          }
        });
      }
    );

    this.chatWindowSubscription = this.messageService.currentChatWindow$
      .subscribe(chatWindow => {
        this.chatWindow = chatWindow;
        // console.log('currentChat changed');
      });

  }

  ngOnDestroy() {
    this.chatWindowSubscription.unsubscribe();
    this._userEmailSub.unsubscribe();
    this._cosmonautSub.unsubscribe();
    this._spaceflightsSub.unsubscribe();
  }

  send() {
    console.log(this.newMessage);
    // this.messageService.sendNewMessage(this.newMessage);
    this.newMessage.timeStamp = Date.now();
    this.messageService.sendNewMessage(this.newMessage, this.chatWindow);
    this.newMessage.message = '';
  }
}
