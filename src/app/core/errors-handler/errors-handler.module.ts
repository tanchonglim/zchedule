import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GlobalErrorHandler } from "./global-error-handler";
import { HttpErrorInterceptor } from "./http-error.interceptor";

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      // interceptor for HTTP errors
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true, // multiple interceptors are possible
    },
  ],
  declarations: [],
  imports: [CommonModule],
})
export class ErrorsHandlerModule {}
