import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../service/order.servive';
import { Orders } from '../models/order';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order: Orders = new Orders();
  orders: Orders[] = new Array();
  modalRef: BsModalRef;
  constructor(private orderService: OrderService,  private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getOrdersByUser();
  }

  getOrdersByUser(){
    this.orderService.getOrdersByUser().subscribe(
      res => this.orders = res
    )
  }
  openModalWithClass(template: TemplateRef<any>, order: Orders) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.order = order;
  }
}
