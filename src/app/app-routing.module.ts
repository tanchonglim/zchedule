import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/service/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./user/login-page/login-page.module").then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomePagePageModule),
    canActivate: [AuthGuard],
  },

  {
    path: "lecturer",
    loadChildren: () =>
      import("./lecturer/lecturer-home-page/lecturer-home-page.module").then(
        (m) => m.LecturerHomePagePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "student",
    loadChildren: () =>
      import("./student/student-home-page/student-home-page.module").then(
        (m) => m.StudentHomePagePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "subject",
    loadChildren: () =>
      import("./subject/subject-home/subject-home.module").then(
        (m) => m.SubjectHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "room",
    loadChildren: () =>
      import("./room/room-home/room-home.module").then(
        (m) => m.RoomHomePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./user/profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
