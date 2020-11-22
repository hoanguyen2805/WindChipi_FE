import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class SignInSignUpGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}
    canActivate():boolean{
        if(this.authService.loggedIn()){
            alert('Hãy đăng xuất tài khoản trước!');
            this.router.navigate(['/home']);
            return false;
        }
        else{
            return true;
        }
    }
}