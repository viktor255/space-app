import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './spaceflight-error.component.html',
  selector: 'app-spaceflight-error'
})
export class SpaceflightErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    message: string,
    message2: string,
    message3: string,
    message4: string,
    message5: string
  }) {
  }
}
