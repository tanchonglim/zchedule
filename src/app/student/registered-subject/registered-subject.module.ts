import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisteredSubjectPageRoutingModule } from './registered-subject-routing.module';

import { RegisteredSubjectPage } from './registered-subject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisteredSubjectPageRoutingModule
  ],
  declarations: [RegisteredSubjectPage]
})
export class RegisteredSubjectPageModule {}
