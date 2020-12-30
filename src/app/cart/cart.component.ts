import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
import { OrderService } from '../service/order.servive';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listCart = new Array();
  tongtien: number = 0;
  constructor(private productService: ProductService, private orderService: OrderService) { }
  ngOnInit(): void {
    if (!!localStorage.getItem('cart')) {
      this.listCart = JSON.parse(localStorage.getItem("cart"));
      this.tinhTongTien();
    }
  }
  tinhTongTien() {
    this.tongtien = 0;
    this.listCart.forEach(item => {
      this.tongtien = this.tongtien + (+item.so_luong) * (+item.price);
    })
  }
  xoa(index: number) {
    this.listCart.splice(+index, 1);
    if (this.listCart.length == 0) {
      localStorage.removeItem("cart");
      this.tongtien = 0;
      return;
    }
    localStorage.setItem("cart", JSON.stringify(this.listCart));
    this.tinhTongTien();
  }
  order(id: number, number_products: number) {
    if (!!localStorage.getItem('token')) {
      const id_product = this.listCart[id].product_id;
      this.productService.getTotalProduct(id_product).subscribe(
        res => {
          if (number_products > res) {
            alert(`Chỉ còn ${res} sản phẩm`);
            return;
          }
          else if (number_products < 0) {
            alert(`Không được < 0`)
          }
          else {
            this.orderService.save(id_product, number_products).subscribe(
              res => {
                alert("Thành Công!");
                this.xoa(id);
              }
            )
          }
        }
      )
    }
    else {
      alert("Hãy đăng nhập!");
      return;
    }


  }
  update(id: number, so_luong: number) {
    this.listCart[id].so_luong = so_luong;
    localStorage.setItem("cart", JSON.stringify(this.listCart));
    alert("Cập nhật thành công!");
    this.tinhTongTien();
  }

}
