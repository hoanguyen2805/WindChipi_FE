import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.servive';
import { UsersService } from '../service/user.service';
import { Orders } from '../models/order';
import { Users } from '../models/user';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Orders[] = new Array();
  user: Users = new Users();
  constructor(private orderService: OrderService, private userService: UsersService) { }

  ngOnInit(): void {
    this.getUserByToken();
    this.getByUser();
  }

  getByUser(){
    this.orderService.getByUser().subscribe(
      res => this.orders = res
    )
  }
  getUserByToken(){
    this.userService.getUserByToken().subscribe(
      res => this.user = res
    )
  }
}
