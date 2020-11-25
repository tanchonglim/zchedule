import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TimetableSubjectsComponent } from "./components/timetable-subjects/timetable-subjects.component";
import { ModalHeaderComponent } from "./components/modal-header/modal-header.component";
import { SubjectListComponent } from "./components/subject-list/subject-list.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    TimetableSubjectsComponent,
    ModalHeaderComponent,
    SubjectListComponent,
    FooterComponent,
  ],
  exports: [
    TimetableSubjectsComponent,
    ModalHeaderComponent,
    SubjectListComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
