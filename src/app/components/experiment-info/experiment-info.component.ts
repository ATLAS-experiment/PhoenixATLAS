import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventDisplayService } from 'phoenix-ui-components';

interface InfoField {
  label: string;
  value: string;
}

// Custom replacement for phoenix-ui-components' <app-experiment-info>.
// That component combines Run/Event/LumiBlock into a single pre-joined
// string (e.g. "Run / Event / LumiBlock: 336567 / 2327102923 / 794") and
// exposes no input to reformat it, so per the phoenix maintainers'
// guidance (github.com/ATLAS-experiment/PhoenixATLAS/issues/27) this is
// copied and adapted locally to show Run and Event on their own lines,
// drop LumiBlock, and show the recorded date/time without a label.
@Component({
  selector: 'atlas-experiment-info',
  standalone: false,
  templateUrl: './experiment-info.component.html',
  styleUrls: ['./experiment-info.component.scss'],
})
export class ExperimentInfoComponent implements OnInit, OnDestroy {
  @Input() url?: string;
  @Input() logo?: string;

  runEventFields: InfoField[] = [];
  dateTime = '';

  private unsubscribe?: () => void;

  constructor(private eventDisplay: EventDisplayService) {}

  ngOnInit() {
    this.unsubscribe = this.eventDisplay.listenToDisplayedEventChange(() => {
      this.updateInfo();
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  private updateInfo() {
    const metadata: InfoField[] = this.eventDisplay.getEventMetadata();
    const runEventFields: InfoField[] = [];
    let dateTime = '';

    for (const field of metadata) {
      if (field.label === 'Data recorded') {
        dateTime = field.value;
        continue;
      }

      const labels = field.label.split(' / ');
      const values = field.value.split(' / ');
      labels.forEach((label, i) => {
        if (label !== 'LumiBlock' && label !== 'LS') {
          runEventFields.push({ label, value: values[i] });
        }
      });
    }

    this.runEventFields = runEventFields;
    this.dateTime = dateTime;
  }
}
