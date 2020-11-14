import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachingSubjectPage } from './teaching-subject.page';

const routes: Routes = [
  {
    path: '',
    component: TeachingSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachingSubjectPageRoutingModule {}
