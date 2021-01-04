import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.servive';
import { Orders } from '../models/order';
import { Products } from '../models/product';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Orders[] = new Array();
  size: number = 0;
  currentPage = 1;
  constructor(private orderService: OrderService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
  }
  getSize() {
    this.orderService.getSize().subscribe(
      res => {
        this.size = res.length;
        console.log(this.size);
      }
    )
  }
  pageChanged(event: any): void {
    this.orderService.paging(event.page - 1).subscribe(
      res => this.orders = res
    )
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
        // bỏ lui
        order.status = trangthaimoi;
        order.number_products = soluongmoi;
        // console.log(order);
        // console.log("trả lui: "+ (-muathem) + "san pham");
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
              //mua them
              order.status = trangthaimoi;
              order.number_products = soluongmoi;
              this.orderService.updateBot(-muathem, order).subscribe(
                response => {
                  alert("Đã cập nhật!");
                  window.location.reload();
                }
              )
              // alert("co the mua")
              // console.log(`mua them ${muathem}`)
            }
            else {
              alert(`Chỉ được mua thêm tối đa ${res} sản phẩm nữa`);
              window.location.reload();
            }
          }
        )
        // mua thêm
        // kiem tra co vuot qua so luong khong
      }
    }

  }
}
