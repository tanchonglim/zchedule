import { Component, OnInit } from "@angular/core";
import { IonicAngularThemeSwitchService } from "ionic-angular-theme-switch";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";
import { SesiSemester } from "src/app/shared/models/SesiSemester";
import { UserServiceService } from "../user-service.service";
import { Auth } from "./../../shared/models/Auth";

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

  themes: Array<any>;

  currentThemeIndex: number;

  constructor(
    private themeSwitchService: IonicAngularThemeSwitchService,
    private us: UserServiceService
  ) {}

  ngOnInit() {
    this.themes = [
      {
        primary: "blue",
        secondary: "#5fb3b3",
        tertiary: "#fac863",
        success: "#90d089",
        warning: "#f99157",
        danger: "#ec5f67",
        light: "#d8dee9",
        medium: "#65737e",
        dark: "#1b2b34",
      },
      {
        primary: "purple",
        secondary: "purple",
        tertiary: "#fac863",
        success: "#90d089",
        warning: "#f99157",
        danger: "#ec5f67",
        light: "#d8dee9",
        medium: "#65737e",
        dark: "#1b2b34",
      },
    ];
    this.currentThemeIndex = 0;
    this.getCurrentUser();
    this.getCurrentSesiSem();
    this.getSesiSemList();
  }

  setTheme(theme) {
    this.themeSwitchService.setTheme(theme);
    this.currentThemeIndex = this.themes.indexOf(theme);
  }

  async getCurrentUser() {
    this.currentUser = await this.us.getCurrentuser();
    console.log(this.currentUser);
  }

  async getCurrentSesiSem() {
    this.currentSesiSem = await this.us.getCurrentSesiSem();
    console.log(this.currentSesiSem);
  }

  async getSesiSemList() {
    this.sesiSemesters = await this.us.getSesiSemList();
    console.log(this.sesiSemesters);
  }

  setCurrentSesiSem(event) {
    let currentSesiSemID = event.detail.value;
    let currentSesiSem = this.sesiSemesters.find(
      (ss) => ss.sesi_semester_id == currentSesiSemID
    );
    this.us.setCurrentSesiSem(currentSesiSem);
  }

  get isDataLoaded() {
    return this.currentUser && this.currentSesiSem && this.sesiSemesters;
  }
}
