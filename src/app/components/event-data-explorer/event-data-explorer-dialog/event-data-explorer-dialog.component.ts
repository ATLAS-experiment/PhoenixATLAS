import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'atlas-event-data-explorer-dialog',
  templateUrl: './event-data-explorer-dialog.component.html',
  styleUrls: ['./event-data-explorer-dialog.component.scss'],
})
export class EventDataExplorerDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EventDataExplorerDialogComponent>
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
