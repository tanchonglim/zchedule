import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { TimetableSubjectsComponent } from "./components/timetable-subjects/timetable-subjects.component";
import { ModalHeaderComponent } from "./components/modal-header/modal-header.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { TimetableDetailComponent } from "./components/timetable-subjects/timetable-detail/timetable-detail.component";
import { NoResultComponent } from "./components/no-result/no-result.component";
import { PageHeaderComponent } from "./components/page-header/page-header.component";
import { ListSubjectComponent } from "./components/list-subject/list-subject.component";
import { LoadingComponent } from "./components/loading/loading.component";

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
    ListSubjectComponent,
    ModalHeaderComponent,
    FooterComponent,
    TimetableDetailComponent,
    NoResultComponent,
    PageHeaderComponent,
    LoadingComponent,
  ],
  exports: [
    TimetableSubjectsComponent,
    ListSubjectComponent,
    ModalHeaderComponent,
    FooterComponent,
    NoResultComponent,
    PageHeaderComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
