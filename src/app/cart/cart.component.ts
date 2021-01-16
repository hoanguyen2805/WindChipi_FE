import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
import { OrderService } from '../service/order.servive';
import { ComponentShareService } from '../service/component-share.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listCart = new Array();
  tongtien: number = 0;
  constructor(private productService: ProductService, private orderService: OrderService,
    private componentShareService: ComponentShareService, private router: Router) { }
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
      localStorage.removeItem("id_cart");
      localStorage.removeItem("cart");
      this.tongtien = 0;
      return;
    }
    localStorage.setItem("cart", JSON.stringify(this.listCart));
    this.tinhTongTien();
  }
  thanhToan(id: number, number_products: number) {
    if (!!localStorage.getItem('token')) {
      const id_product = this.listCart[id].product_id;
      const size = this.listCart[id].size;
      this.productService.getTotalProduct(id_product).subscribe(
        res => {
          if (number_products > res) {
            if(res == 0){
              alert(`Hết hàng!`);
            }
            else{
              alert(`Chỉ còn ${res} sản phẩm`);
            }
            
            return;
          }
          else {
            this.componentShareService.nextMessage({
              "id_product": id_product, "so_luong": number_products, "size": size
            });
            localStorage.setItem("id_cart", `${id}`);
            this.router.navigate(['/order-confirmation'])
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
  tang(nut: any) {
    nut.value = +nut.value + 1;
  }
  giam(nut: any) {
    if (nut.value <= 1) {
      return;
    }
    else {
      nut.value = +nut.value - 1;
    }
  }
}
