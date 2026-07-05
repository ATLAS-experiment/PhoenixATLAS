import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { PhoenixUIModule } from 'phoenix-ui-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ATLASComponent } from './pages/atlas/atlas.component';
import { ExperimentInfoComponent } from './components/experiment-info/experiment-info.component';

@NgModule({
  declarations: [AppComponent, ATLASComponent, ExperimentInfoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    PhoenixUIModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
