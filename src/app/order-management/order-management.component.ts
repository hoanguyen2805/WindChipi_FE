import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../service/order.servive';
import { Orders } from '../models/order';
import { Products } from '../models/product';
import { ProductService } from '../service/product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Orders[] = new Array();
  size: number = 0;
  currentPage = 1;
  searchText: string;
  modalRef: BsModalRef;
  order: Orders = new Orders();
  constructor(private orderService: OrderService, private productService: ProductService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
  }
  search(page: number){
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.currentPage = 1;
    this.getSize();
    this.orderService.searchOrder(this.searchText, page).subscribe(
      res => this.orders = res
    )
  }
  getSize() {
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.orderService.getSize(this.searchText).subscribe(
      res => this.size = res
    )
  }
  pageChanged(event: any): void {
    this.search(event.page - 1);
  }

  openModalWithClass(template: TemplateRef<any>, order: Orders) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.order = order;
  }

  delete(id: number) {
    this.orderService.deleteById(id).subscribe(
      res => {
        alert("Đã xóa!");
        window.location.reload();
      }
    )
  }
  
  update(trangthaimoi: string, soluongmoi: number, order: Orders) {
    if (soluongmoi < 1) {
      alert("Số lượng sản phẩm không được < 1");
      return;
    }
    else {
      const muathem = soluongmoi - order.number_products.valueOf();
      if (muathem <= 0) {
        order.status = trangthaimoi;
        order.number_products = soluongmoi;
        this.orderService.updateBot(-muathem, order).subscribe(
          res => {
            alert("Đã cập nhật!");
            window.location.reload();
          }
        )
      }
      else {
        const muathem = soluongmoi - order.number_products.valueOf();
        this.productService.getTotalProduct(order.idProduct.toString()).subscribe(
          res => {
            if (muathem <= res) {
              order.status = trangthaimoi;
              order.number_products = soluongmoi;
              this.orderService.updateBot(-muathem, order).subscribe(
                response => {
                  alert("Đã cập nhật!");
                  window.location.reload();
                }
              )
            }
            else {
              alert(`Chỉ được mua thêm tối đa ${res} sản phẩm nữa`);
              window.location.reload();
            }
          }
        )
      }
    }

  }
}
