import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomePagePageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./user/login-page/login-page.module").then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: "lecturer",
    loadChildren: () =>
      import("./lecturer/lecturer-home-page/lecturer-home-page.module").then(
        (m) => m.LecturerHomePagePageModule
      ),
  },
  {
    path: "student",
    loadChildren: () =>
      import("./student/student-home-page/student-home-page.module").then(
        (m) => m.StudentHomePagePageModule
      ),
  },
  {
    path: "subject",
    loadChildren: () =>
      import("./subject/subject-home/subject-home.module").then(
        (m) => m.SubjectHomePageModule
      ),
  },
  {
    path: "room",
    loadChildren: () =>
      import("./room/room-home/room-home.module").then(
        (m) => m.RoomHomePageModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
