import { Component, OnInit } from "@angular/core";
import {
  IonicAngularThemeSwitchService,
  IonicColors,
} from "ionic-angular-theme-switch";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { UserServiceService } from "../user-service.service";
import { Auth } from "./../../shared/models/Auth";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { themes } from "./../Theme";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  currentUser: Auth;
  sesiSemesters: Array<SesiSemester>;
  currentSesiSem: SesiSemester;

  pageHeaderProps: PageHeaderProps = {
    title: "Profile",
    tabs: [],
  };

  themes: Array<IonicColors>;

  currentThemeIndex: number;

  offlineMode: Boolean;

  constructor(
    private us: UserServiceService,
    private route: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
    this.themes = themes;
    let currentTheme = await this.us.getCurrentTheme();

    if (currentTheme) {
      this.currentThemeIndex = this.themes.findIndex(
        (theme) => theme.primary === currentTheme.primary
      );
    } else {
      this.currentThemeIndex = 0;
    }

    this.getCurrentUser();
    this.getCurrentSesiSem();
    this.getSesiSemList();
    this.offlineMode = await this.us.getOfflineMode();
  }

  compareWith(o1: SesiSemester, o2: SesiSemester) {
    return o1 && o2 ? o1.sesi_semester_id === o2.sesi_semester_id : o1 === o2;
  }

  async getCurrentUser() {
    this.currentUser = await this.us.getCurrentuser();
  }

  async getCurrentSesiSem() {
    this.currentSesiSem = await this.us.getCurrentSesiSem();
  }

  async getSesiSemList() {
    this.sesiSemesters = await this.us.getSesiSemList();
  }

  setTheme(theme) {
    this.us.setCurrentTheme(theme);
    this.currentThemeIndex = this.themes.indexOf(theme);
  }

  setCurrentSesiSem(event) {
    let currentSesiSem = event.detail.value;
    currentSesiSem = this.sesiSemesters.find(
      (ss) => ss.sesi_semester_id === currentSesiSem.sesi_semester_id
    );

    this.currentSesiSem = currentSesiSem;
    this.us.setCurrentSesiSem(currentSesiSem);
  }

  get isDataLoaded() {
    return this.currentUser && this.currentSesiSem && this.sesiSemesters;
  }

  async setOfflineMode(event) {
    const loading = await this.loadingController.create({
      spinner: "lines",
      message: null,
    });
    await loading.present();
    await this.us.setOfflineMode(event.detail.checked);
    loading.dismiss();
  }

  async signout() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: "Are you sure to log out? ",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Log Out",
          handler: async () => {
            await this.us.logout();
            const toast = await this.toastController.create({
              message: "Logged out!",
              duration: 2000,
            });
            await toast.present();
            this.route.navigate(["login"]);
          },
        },
      ],
    });

    await alert.present();
  }

  getRole() {
    switch (this.currentUser.role) {
      case "2":
        return "Lecturer";
      case "3":
        return "Admin";
      default:
        return "student";
    }
  }
}
