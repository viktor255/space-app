import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { DestroySuccessful } from '../spaceflight.actions';

@Injectable({
  providedIn: 'root'
})
export class SpaceflightsService {


  spaceflightDestroyed$ = this.socket.fromEvent<string>('spaceflightDestroyed');
  spaceflightDestructionStarted$ = this.socket.fromEvent<string>('spaceflightDestructionStarted');

  constructor(private store: Store<AppState>, private socket: Socket) {
  }

  destroySpaceflight(id: string) {
    this.socket.emit('destroySpaceflight', id);
    this.store.dispatch(new DestroySuccessful({_id: id}));
  }

  destroySpaceflightRequest(id: string) {
    this.socket.emit('destroySpaceflightRequest', id);
  }

  joinSpaceflightSocket(id: string) {
    this.socket.emit('joinSpaceflight', id);
  }
  leaveSpaceflightSocket(id: string) {
    this.socket.emit('leaveSpaceflight', id);
  }

}
