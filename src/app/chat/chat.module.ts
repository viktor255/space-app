import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ChatComponent } from './chat.component';
import { MessageComponent } from './message/message.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatWindowListComponent } from './chat-window-list/chat-window-list.component';
import { AngularMaterialModule } from '../angular-material.module';

// const BACKEND_URL = environment.apiUrl;
const BACKEND_URL = 'http://localhost:3000';
const config: SocketIoConfig = { url: BACKEND_URL, options: {} };

@NgModule({
  declarations: [
    ChatComponent,
    MessageComponent,
    ChatWindowComponent,
    ChatWindowListComponent
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
