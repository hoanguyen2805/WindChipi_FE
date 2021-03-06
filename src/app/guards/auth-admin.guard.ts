import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate():boolean{
        if(this.authService.getRoles().includes("ROLE_ADMIN")){
            return true;
        } else{
            alert('Bạn không phải Admin!')
            this.router.navigate(['/login']);
            return false;
        }
    }
}