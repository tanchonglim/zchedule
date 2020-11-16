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
      import("./core//authentication/login-page/login-page.module").then(
        (m) => m.LoginPagePageModule
      ),
  },
  {
    path: 'lecturer-home-page',
    loadChildren: () => import('./lecturer/lecturer-home-page/lecturer-home-page.module').then( m => m.LecturerHomePagePageModule)
  },
  {
    path: 'student-home-page',
    loadChildren: () => import('./student/student-home-page/student-home-page.module').then( m => m.StudentHomePagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
