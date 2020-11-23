import { Component, OnInit } from '@angular/core';
import { Users } from '../models/user';
import { UsersService } from '../service/user.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: Users = new Users();
  roles: any;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserByToken().subscribe(
      res => {
        this.user = res
        this.roles = res.roles;
      }
    )
  }

}
