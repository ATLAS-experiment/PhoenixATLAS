import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JiveXMLLoader } from 'phoenix-event-display';
import { EventDisplayService } from 'phoenix-ui-components';

// Local API URL for debugging.
// const localAPI = 'http://localhost/phoenix/php/read-files.php';
const serverAPI = 'api/read-files.php';

@Component({
  selector: 'atlas-event-data-explorer-dialog',
  templateUrl: './event-data-explorer-dialog.component.html',
  styleUrls: ['./event-data-explorer-dialog.component.scss'],
})
export class EventDataExplorerDialogComponent {
  private apiPath = serverAPI;
  dataDirectoryFiles: string[];

  constructor(
    private eventDisplay: EventDisplayService,
    private dialogRef: MatDialogRef<EventDataExplorerDialogComponent>
  ) {
    fetch(this.apiPath)
      .then((res) => res.json())
      .then((res: string[]) => {
        this.dataDirectoryFiles = res;
      });
  }

  loadEvent(file: string) {
    fetch(`${this.apiPath}?f=${file}`)
      .then((res) => res.text())
      .then((eventData) => {
        switch (file.split('.').pop()) {
          case 'xml':
            this.loadJiveXMLEvent(eventData);
            break;
          case 'json':
            this.loadJSONEvent(eventData);
            break;
        }
      });
  }

  private loadJSONEvent(eventData: string) {
    this.eventDisplay.parsePhoenixEvents(JSON.parse(eventData));
    this.onClose();
  }

  private loadJiveXMLEvent(eventData: string) {
    const jiveXMLLoader = new JiveXMLLoader();
    jiveXMLLoader.process(eventData);
    const processedEventData = jiveXMLLoader.getEventData();
    this.eventDisplay.buildEventDataFromJSON(processedEventData);
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }
}
