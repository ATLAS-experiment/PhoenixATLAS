import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JiveXMLLoader } from 'phoenix-event-display';
import { EventDisplayService } from 'phoenix-ui-components';

// Local API URL for debugging.
// const serverAPI = 'http://localhost/phoenix/php/read-files.php';
const serverAPI = 'api/read-files.php';

const supportFileTypes = ['json', 'xml'];

@Component({
  selector: 'atlas-event-data-explorer-dialog',
  templateUrl: './event-data-explorer-dialog.component.html',
  styleUrls: ['./event-data-explorer-dialog.component.scss'],
})
export class EventDataExplorerDialogComponent {
  private apiPath = serverAPI;
  dataDirectoryFiles: string[];
  loading = true;
  error = false;

  constructor(
    private eventDisplay: EventDisplayService,
    private dialogRef: MatDialogRef<EventDataExplorerDialogComponent>
  ) {
    fetch(this.apiPath)
      .then((res) => res.json())
      .then((res: string[]) => {
        this.dataDirectoryFiles = res.filter((file) =>
          supportFileTypes.includes(file.split('.').pop())
        );

        this.error = false;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loadEvent(file: string) {
    this.loading = true;
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

        this.error = false;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
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
