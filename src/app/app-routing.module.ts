import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home-page",
    pathMatch: "full",
  },
  {
    path: "home-page",
    loadChildren: () =>
      import("./home-page/home-page.module").then((m) => m.HomePagePageModule),
  },
  {
    path: "login-page",
    loadChildren: () =>
      import("./login-page/login-page.module").then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: "teaching-subject",
    loadChildren: () =>
      import("./lecturer/teaching-subject/teaching-subject.module").then(
        (m) => m.TeachingSubjectPageModule
      ),
  },
  {
    path: "registered-subject",
    loadChildren: () =>
      import("./student/registered-subject/registered-subject.module").then(
        (m) => m.RegisteredSubjectPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
