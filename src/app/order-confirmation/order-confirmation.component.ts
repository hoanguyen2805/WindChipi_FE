import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentShareService } from '../service/component-share.service';
import { Users } from '../models/user';
import { Orders } from '../models/order';
import { UsersService } from '../service/user.service';
import { ProductService } from '../service/product.service';
import { OrderService } from '../service/order.servive';
import { Products } from '../models/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  message: any;
  product: Products = new Products();
  user: Users = new Users();
  formInfo: FormGroup;
  shipping: number = 0;
  sum: number = 0;
  constructor(private componentShareService: ComponentShareService, private usersService: UsersService,
    private fb: FormBuilder, private productService: ProductService,
    private orderService: OrderService, private router: Router) { }
  ngOnInit(): void {
    this.componentShareService.sharedMessage.subscribe(
      data => {
        this.message = data
        this.productService.getProductById(this.message.id_product).subscribe(
          res => {
            this.product = res;
            if (+this.product.price * this.message.so_luong >= 200000) {
              this.shipping = 0;
            }
            else {
              this.shipping = 20000;
            }
            this.sum = +this.product.price * this.message.so_luong + this.shipping;
          }
        )
      }
    )
    this.formInfo = this.fb.group({
      full_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
    this.usersService.getUserByToken().subscribe(
      res => {
        this.user = res
        this.formInfo.patchValue({
          full_name: this.user.full_name,
          phone: this.user.phone,
          address: this.user.address
        })
      }
    )
  }
  onSubmit() {
    if (this.formInfo.invalid) {
      alert("Hãy nhập đủ thông tin!")
      return;
    }
    else {
      const newOrder: Orders = new Orders();
      newOrder.idProduct = this.message.id_product;
      newOrder.number_products = this.message.so_luong;
      newOrder.size = this.message.size;
      newOrder.full_name = this.formInfo.value.full_name;
      newOrder.address = this.formInfo.value.address;
      newOrder.phone = this.formInfo.value.phone;
      this.productService.getProductById(+newOrder.idProduct).subscribe(
        data => {
          if (newOrder.number_products > data.total) {
            alert(`Chỉ còn ${data.total} sản phẩm`);
          }
          else {
            this.orderService.save(newOrder).subscribe(
              res => {
                alert("Thành công!");
                // Đặt hàng thành công thì xóa
                const list_cart: Array<any> = JSON.parse(localStorage.getItem("cart"));
                if (list_cart) {
                  const vi_tri = localStorage.getItem("id_cart");
                  list_cart.splice(+vi_tri, 1);
                  localStorage.removeItem("id_cart");
                  if (list_cart.length == 0) {
                    localStorage.removeItem("cart");
                  }
                  else {
                    localStorage.setItem("cart", JSON.stringify(list_cart));
                  }
                  // end
                }
                this.router.navigate(['/shopping-cart'])
              }
            )
          }
        }
      )



    }
  }
}