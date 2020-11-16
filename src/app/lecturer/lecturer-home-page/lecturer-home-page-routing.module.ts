import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturerHomePagePage } from './lecturer-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: LecturerHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerHomePagePageRoutingModule {}
