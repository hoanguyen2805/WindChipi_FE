import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersService } from '../service/user.service';
import { Users } from '../models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Users[] = new Array();
  size: number = 0;
  currentPage = 1;
  modalRef: BsModalRef;
  formUpdate: FormGroup;
  roles: String[] = new Array();
  id: number;

  searchText: string;
  
  constructor(private userService: UsersService, private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
    this.formUpdate = this.fb.group({
      username: [''],
      email: [''],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: [''],
      admin: [false],
    })
    
  }

  search(page: number){
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.currentPage = 1;
    this.getSize();
    this.userService.searchUser(this.searchText, page).subscribe(
      res => this.users = res
    )
  }
  getSize() {
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.userService.getSize(this.searchText).subscribe(
      res => {
        this.size = res;
      }
    )
  }
  pageChanged(event: any): void {
    this.search(event.page - 1);
  }
  openModalWithClass(template: TemplateRef<any>, user: Users) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.roles = user.roles;
    // console.log(this.roles);
    if (this.roles.length == 2) {
      this.formUpdate.patchValue({
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        password: "",
        admin: true
      })
    }
    else {
      this.formUpdate.patchValue({
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        address: user.address,
        password: "",
        admin: false
      })
    }
    this.id = +user.id;
  }
  delete(id: number) {
    this.userService.getSizeOrderByUser(id).subscribe(
      res => {
        if (res >= 1) {
          alert(`Không thể xóa! Hãy xóa ${res} đơn hàng của người dùng này trước!`);
          return;
        }
        else {
          this.userService.getSizeCommentByUser(id).subscribe(
            response => {
              if (response >= 1) {
                alert(`Không thể xóa! Hãy xóa ${response} bình luận của người dùng này trước!`);
                return;
              }
              else {
                this.userService.deleteUserByAdmin(id).subscribe(
                  r => {
                    alert("Đã xóa!");
                    window.location.reload();
                  }
                )
              }
            }
          )
        }
      }
    )
  }

  onSubmit() {
    if (this.formUpdate.invalid) {
      alert('Chưa điền đủ các trường!');
      return;
    }
    const password = this.formUpdate.value.password;
    if (password.trim().length > 0 && password.trim().length < 8) {
      alert('Mật khẩu phải dài >= 8');
      return;
    }
    const updateUser: Users = new Users();
    updateUser.id = this.id;
    updateUser.username = this.formUpdate.value.username;
    updateUser.full_name = this.formUpdate.value.fullName;
    updateUser.email = this.formUpdate.value.email;
    updateUser.phone = this.formUpdate.value.phone;
    updateUser.address = this.formUpdate.value.address;
    updateUser.password = this.formUpdate.value.password;
    if(this.formUpdate.value.admin){
      updateUser.role = ["admin", "user"]
    }
    else{
      updateUser.role = ["user"]
    }
    console.log(updateUser);
    this.userService.updateUserByAdmin(updateUser).subscribe(
      res => {
        alert("Đổi thông tin thành công!");
        window.location.reload();
      }
    )
  }
}
