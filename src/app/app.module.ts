import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhoenixUIModule } from 'phoenix-ui-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ATLASComponent } from './atlas/atlas.component';

@NgModule({
  declarations: [AppComponent, ATLASComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PhoenixUIModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
