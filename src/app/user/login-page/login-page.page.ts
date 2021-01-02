import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "@ionic/angular";
import { UserServiceService } from "../user-service.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.page.html",
  styleUrls: ["./login-page.page.scss"],
})
export class LoginPagePage implements OnInit {
  login: string;
  password: string;
  constructor(
    private us: UserServiceService,
    private navCtrl: NavController,
    public tc: ToastController
  ) {}

  async ngOnInit() {
    if (await this.us.getCurrentuser()) {
      this.navCtrl.navigateRoot("/home");
    }
  }

  async signin() {
    let login = this.login;
    let password = this.password;

    //input validation
    if (!login || !password) {
      const toast = await this.tc.create({
        message: "Please enter login and password",
        duration: 2000,
      });
      await toast.present();
      return;
    }

    //login & password server validation
    let user = await this.us.login(login, password);

    if (!user) {
      const toast = await this.tc.create({
        message: "Invalid credential, try again",
        duration: 2000,
      });
      await toast.present();
    } else {
      const toast = await this.tc.create({
        message: "Login success!",
        duration: 2000,
      });
      await toast.present();
      this.navCtrl.navigateRoot("/home");
    }
  }
}
