import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthUserGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate():boolean{
        if(this.authService.getRoles().includes("ROLE_USER")){
            return true;
        } else{
            alert('Hãy đăng nhập')
            this.router.navigate(['/login']);
            return false;
        }
    }
}