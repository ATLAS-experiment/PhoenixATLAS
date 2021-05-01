import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhoenixUIModule } from 'phoenix-ui-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ATLASComponent } from './pages/atlas/atlas.component';
import { EventDataExplorerComponent } from './components/event-data-explorer/event-data-explorer.component';
import { EventDataExplorerDialogComponent } from './components/event-data-explorer/event-data-explorer-dialog/event-data-explorer-dialog.component';

@NgModule({
  declarations: [AppComponent, ATLASComponent, EventDataExplorerComponent, EventDataExplorerDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PhoenixUIModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
