import { Component, OnInit } from '@angular/core';
import { Users } from '../models/user';
import { UsersService } from '../service/user.service';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isCollapsed = true;
  user: Users = new Users();
  formUpdate: FormGroup;
  constructor(private usersService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formUpdate = this.fb.group({
      fullName:['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['']
    })
    this.usersService.getUserByToken().subscribe(
      res => {
        this.user = res
        this.formUpdate.patchValue({
          fullName: this.user.full_name,
          phone: this.user.phone,
          address: this.user.address
        })
      }
    )
    
  }
  hien(){
    this.isCollapsed = !this.isCollapsed;
  }
  onSubmit(){
    if(this.formUpdate.invalid){
      alert('Chưa điền các giá trị!');
      return;
    }
    var password : String = this.formUpdate.value.password;
    this.user.full_name = this.formUpdate.value.fullName;
    this.user.phone=this.formUpdate.value.phone;
    this.user.address=this.formUpdate.value.address;
    if(password.trim().length>0 && password.trim().length<8){
      alert('Mật khẩu phải dài >= 8');
    }
    if(password.trim().length == 0){
      this.user.password="";
      this.usersService.updateUser(this.user).subscribe(
        res=>{
          alert("Thành công!");
          console.log("Thành công! Không đổi pass");
          this.isCollapsed = !this.isCollapsed;
        }
      )
    }
    if(password.trim().length>=8){
      this.user.password=this.formUpdate.value.password;
      this.usersService.updateUser(this.user).subscribe(
        res=>{
          alert('Thành công!');
          console.log("Thành công! Đổi pass");
          this.isCollapsed = !this.isCollapsed;
        }
      )
    }
  }

}
