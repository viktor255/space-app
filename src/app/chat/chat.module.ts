import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ChatComponent } from './chat.component';
import { MessageComponent } from './message/message.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AngularMaterialModule } from '../angular-material.module';

const BACKEND_URL = environment.socketUrl;
const config: SocketIoConfig = { url: BACKEND_URL, options: {} };

@NgModule({
  declarations: [
    ChatComponent,
    MessageComponent,
    ChatWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularMaterialModule,
    SocketIoModule.forRoot(config)
  ],
  exports: []
})
export class ChatModule {
}
