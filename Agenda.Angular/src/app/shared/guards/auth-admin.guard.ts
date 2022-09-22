import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take } from "rxjs";
import { ConfirmModalService } from "../components/confirm-modal/services/confirm-modal.service";
import { Roles } from "../enums/user-roles";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthAdminGuard implements CanActivate  {

    constructor(
        private authService: AuthService,
        private confirmModalService: ConfirmModalService,
        private router:Router
        ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const userRole = this.authService.getRole(); 
        if (userRole != Roles.ADMIN) {
            this.showUnauthorizedMessage();
            this.router.navigate(['dashboard','home'])
        }
        return true;
    }

    showUnauthorizedMessage(): void{
        this.confirmModalService.open({
                title: 'Acesso negado',
                message:'redirecionando para a home'
        });
        this.confirmModalService.closed
            .pipe(take(1))
            .subscribe();
    }
}
