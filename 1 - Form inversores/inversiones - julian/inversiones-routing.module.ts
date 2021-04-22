import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InversionesPage } from './inversiones.page';

const routes: Routes = [
  {
    path: '',
    component: InversionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InversionesPageRoutingModule {}
