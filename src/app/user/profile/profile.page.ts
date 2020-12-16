import { Component, OnInit } from "@angular/core";
import { IonicAngularThemeSwitchService } from "ionic-angular-theme-switch";
import { PageHeaderProps } from "src/app/shared/components/page-header/page-header.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  pageHeaderProps: PageHeaderProps = {
    title: "Profile",
    tabs: [],
  };

  themes: Array<any>;

  currentThemeIndex: number;

  constructor(private themeSwitchService: IonicAngularThemeSwitchService) {}

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
        secondary: "#5fb3b3",
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
  }

  setTheme(theme) {
    this.themeSwitchService.setTheme(theme);
    this.currentThemeIndex = this.themes.indexOf(theme);
  }
}
