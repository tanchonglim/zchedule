import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentHomePagePage } from './student-home-page.page';

const routes: Routes = [
  {
    path: '',
    component: StudentHomePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentHomePagePageRoutingModule {}
