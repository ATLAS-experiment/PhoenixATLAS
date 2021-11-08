import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JiveXMLLoader } from 'phoenix-event-display';
import { EventDisplayService } from 'phoenix-ui-components';

// Local API URL for debugging.
const serverAPI = 'http://localhost/phoenix/api/read-files.php';
// const serverAPI = 'api/read-files.php';

const supportFileTypes = ['json', 'xml'];

type FileResponse = {
  name: string;
  url: string;
};

@Component({
  selector: 'atlas-event-data-explorer-dialog',
  templateUrl: './event-data-explorer-dialog.component.html',
  styleUrls: ['./event-data-explorer-dialog.component.scss'],
})
export class EventDataExplorerDialogComponent {
  private apiPath = serverAPI;
  eventDataFiles: FileResponse[];
  configFiles: FileResponse[];
  loading = true;
  error = false;

  constructor(
    private eventDisplay: EventDisplayService,
    private dialogRef: MatDialogRef<EventDataExplorerDialogComponent>
  ) {
    // Event data
    this.makeRequest(this.apiPath, 'json', (res: FileResponse[]) => {
      this.eventDataFiles = res.filter((file) =>
        supportFileTypes.includes(file.name.split('.').pop())
      );
    });

    // Config
    this.makeRequest(`${this.apiPath}?type=config`, 'json', (res: FileResponse[]) => {
      this.configFiles = res.filter((file) => file.name.split('.').pop() === 'json');
    });
  }

  loadEvent(file: string) {
    this.makeRequest(file, 'text', (eventData) => {
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

  loadConfig(file: string) {
    this.makeRequest(
      `${this.apiPath}?type=config&f=${file}`,
      'text',
      (config) => {
        const stateManager = this.eventDisplay.getStateManager();
        stateManager.loadStateFromJSON(JSON.parse(config));

        this.onClose();
      }
    );
  }

  // Helpers

  onClose() {
    this.dialogRef.close();
  }

  makeRequest(
    urlPath: string,
    responseType: 'json' | 'text',
    onData: (data: any) => void
  ) {
    this.loading = true;
    fetch(urlPath)
      .then((res) => res[responseType]())
      .then((data) => {
        onData(data);
        this.error = false;
      })
      .catch(() => {
        this.error = true;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
