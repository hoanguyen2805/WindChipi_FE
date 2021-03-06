import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSignIn: FormGroup;
  returnUrl: String;
  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.formSignIn = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(`Link ne ${this.returnUrl}`);
  }
  onSubmit(): void {
    this.authService.login(this.formSignIn.value).subscribe(
      res => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('roles', res.roles);
        console.log(`Đăng nhập thành công: ${JSON.stringify(res)}`);
        if (this.authService.getRoles().includes("ROLE_ADMIN")) {
          this.router.navigate(['/admin']);
        }
        else {
          const url: string = localStorage.getItem("url");
          if (url) {
            this.router.navigate([url]);
          }
          else{
            this.router.navigate(["/"]);
          }
        }

      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert('Đăng nhập thất bại!');
          }
        }
      }
    )
  }
}
