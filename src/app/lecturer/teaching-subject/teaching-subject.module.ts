import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeachingSubjectPageRoutingModule } from './teaching-subject-routing.module';

import { TeachingSubjectPage } from './teaching-subject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeachingSubjectPageRoutingModule
  ],
  declarations: [TeachingSubjectPage]
})
export class TeachingSubjectPageModule {}
