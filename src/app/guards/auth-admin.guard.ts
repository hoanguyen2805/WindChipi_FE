import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate():boolean{
        if(true){
            return true;
        } else{
            alert('Không có quyền Admin!')
            this.router.navigate(['/home']);
            return false;
        }
    }
}