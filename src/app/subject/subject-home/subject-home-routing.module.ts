import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectHomePage } from './subject-home.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectHomePageRoutingModule {}
