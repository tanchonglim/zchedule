import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { from, Observable } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // show loading spinner
    // this.loadingDialogService.openDialog();

    return from(this.handle(request, next)) as Observable<HttpEvent<any>>;
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    const loading = await this.loadingController.create({
      message: "Loading...",
    });
    await loading.present();

    return next
      .handle(request)
      .pipe(
        catchError(async (error: HttpErrorResponse) => {
          const toast = await this.toastController.create({
            message: "Server is Down!!",
            duration: 2000,
          });
          await toast.present();
          await toast.onWillDismiss();
          // this.router.navigate(["/"]);
          console.error("Error from error interceptor", error);
        }),
        finalize(() => {
          // hide loading spinner
          loading.dismiss();
        })
      )
      .toPromise();
  }
}
