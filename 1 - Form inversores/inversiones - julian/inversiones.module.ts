import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InversionesPageRoutingModule } from './inversiones-routing.module';

import { InversionesPage } from './inversiones.page';
import { ViewCityComponentModule } from 'src/app/componenets/view-city/view-city.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewCityComponentModule,
    InversionesPageRoutingModule
  ],
  declarations: [InversionesPage]
})
export class InversionesPageModule {}
