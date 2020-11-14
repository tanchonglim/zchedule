import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisteredSubjectPage } from './registered-subject.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteredSubjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredSubjectPageRoutingModule {}
