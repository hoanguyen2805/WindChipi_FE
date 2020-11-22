import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Users } from '../models/user';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MustMatch } from './helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formSignUp: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formSignUp = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      confirmPassword: ["", [Validators.required, ]]
    }, {
      validator: MustMatch('password','confirmPassword')
    });
   
  }
  onSubmit(){
      const newUser: Users = new Users();
      newUser.username = this.formSignUp.value.username;
      newUser.email = this.formSignUp.value.email;
      newUser.password = this.formSignUp.value.password;
      newUser.phone = this.formSignUp.value.phone;
      newUser.address = this.formSignUp.value.address;
      newUser.role = ["user"];
      console.log(newUser);
      this.authService.register(newUser).subscribe(
        res=>{
          console.log(res);
          alert('Thành Công! Vui lòng đăng nhập lại!')
          this.router.navigate(["/login"]);
        },
        err=>{
          if (err instanceof HttpErrorResponse) {
            if (err.status === 400) {
              alert('Không thành công! Username hoặc Email đã tồn tại');
            }
          }
        }
      )
  }
}
