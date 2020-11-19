import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomHomePage } from './room-home.page';

const routes: Routes = [
  {
    path: '',
    component: RoomHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomHomePageRoutingModule {}
