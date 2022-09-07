import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take } from "rxjs";
import { ConfirmModalService } from "../components/confirm-modal/services/confirm-modal.service";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        private confirmModalService: ConfirmModalService,
        private authService: AuthService
    ){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const hasToken = !!this.authService.getToken();
        if (!hasToken) {
            this.showMessageAndLogout();
            this.router.navigate(['login']);
        }
        return hasToken;
    }

    showMessageAndLogout(): void {
        this.confirmModalService.open({
            title: 'Ops...',
            message: 'Você precisa estar logado para acessar essa área',
        });
        this.confirmModalService.closed
          .pipe(take(1))
          .subscribe();
      }
  
}