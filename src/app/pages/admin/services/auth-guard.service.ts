import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthAdminService } from "./auth-admin.service";

@Injectable()
export class AuthGuard implements CanActivate {
    public isAuth;
    constructor(private authAdminService: AuthAdminService) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuthenticated().then((auth) => {
            if(!auth){
                return false;
            }
            return true;
        })
    }

    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            this.authAdminService.admin.subscribe(admin => {
                console.log("passage")
                if(!admin) {
                    resolve(false);
                }
                    resolve(!!admin);
            })
        })
        return promise;
    }


}