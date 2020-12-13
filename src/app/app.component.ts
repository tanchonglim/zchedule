import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { GlobalEventService } from "./core/service/global-event.service";

import {
  state,
  style,
  transition,
  animate,
  trigger,
} from "@angular/animations";
import { DataServiceService } from "./core/service/data-service.service";
import { AuthServiceService } from "./core/authentication/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          opacity: 1,
        })
      ),
      state(
        "closed",
        style({
          transform: "translateY(100%)",
        })
      ),
      transition("* <=> *", [animate("0.2s")]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  showFooter: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private ge: GlobalEventService,
    private ds: DataServiceService,
    private as: AuthServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    this.ge.scrollEvent.subscribe((e) => {
      this.showFooter = e;
    });
    //auto login feature
    //if success login before, then every 10 minutes, get new session
    let credential = await this.ds.getCurrentUserCredential();
    if (credential) {
      //TODO: if redirect, jump to login page
      await this.as.login(credential.login, credential.password);
      setInterval(() => {
        //TODO: if redirect, jump to login page
        this.as.login(credential.login, credential.password);
      }, 10 * 60 * 1000);
    }
  }

  get showFooterMenu() {
    return !this.router.url.includes("login");
  }
}
