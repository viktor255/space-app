import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-snack-bar',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ConfirmationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
  }

}
