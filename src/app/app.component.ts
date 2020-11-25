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
    private ge: GlobalEventService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.ge.scrollEvent.subscribe((e) => {
      this.showFooter = e;
    });
  }
}
