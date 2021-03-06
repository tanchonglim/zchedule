import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { CalendarModule } from "ion2-calendar";
import { AppInitService } from "./core/service/app-init.service";

import { IonicAngularThemeSwitchService } from "ionic-angular-theme-switch";
import { IonicStorageModule } from "@ionic/storage";

// import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';
// import { ChartsModule } from "ng2-charts";

// import { Ng2GoogleChartsModule } from "ng2-google-charts";

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.init();
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    SharedModule,
    CalendarModule,
    IonicStorageModule.forRoot(),
    // Ng2GoogleChartsModule,
    // ChartsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true,
    },
    IonicAngularThemeSwitchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
