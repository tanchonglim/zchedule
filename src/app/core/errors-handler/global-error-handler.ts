import { ErrorHandler, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    public toastController: ToastController,
    private router: Router
  ) {}

  async handleError(error: Error) {
    const toast = await this.toastController.create({
      message: "An unexpected error occurs",
      duration: 2000,
    });
    await toast.present();
    await toast.onWillDismiss();
    // this.router.navigate(["/"]);

    console.log("Error from global error handler", error);
  }
}
