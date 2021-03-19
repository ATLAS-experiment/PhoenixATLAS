import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ATLASComponent } from './atlas/atlas.component';

const routes: Routes = [
  {
    path: '',
    component: ATLASComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
