import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, take, throwError } from 'rxjs';
import { ConfirmModalConfig } from '../components/confirm-modal/classes/confirm-modal-config';
import { ConfirmModalService } from '../components/confirm-modal/services/confirm-modal.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

constructor(
    private authService: AuthService,
    private confirmModalService: ConfirmModalService,
    private router: Router
) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = this.setToken(req, token);
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpEvent<any>) => {
          if (error instanceof HttpErrorResponse) {
            this.error401Handler(error);
          }
          return throwError(() => new Error());
        })
      );
  }

  error401Handler(error: HttpErrorResponse): void {
    if (error.status !== 401) {
      return;
    }
    const config = {
      title: "Sessão expirada",
      message: "Sua sessão expirou! Por gentileza, entre novamente no sistema.",
    } as ConfirmModalConfig;
    this.confirmModalService.open(config);
    this.confirmModalService.closed
      .pipe(take(1))
      .subscribe(() => {
        this.authService.clearToken();
        this.router.navigate(['login']);
      });
  }

  setToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
  }

}
