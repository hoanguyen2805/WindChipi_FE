import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Products[] = new Array();
  size: number = 0;
  currentPage = 1;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
  }
  getSize() {
    this.productService.getSize().subscribe(
      res => this.size = res
    )
  }
  pageChanged(event: any): void {
    this.productService.paging(event.page - 1).subscribe(
      res => {
        this.products = res;
      }
    )
  }
  delete(id: number) {
    this.productService.getSizeOrderByProduct(id).subscribe(
      res => {
        if (res >= 1) {
          alert(`Không thể xóa! Hãy xóa ${res} đơn hàng của sản phẩm này trước!`);
          return;
        }
        else {
          this.productService.getSizeCommentByProduct(id).subscribe(
            response => {
              if (response >= 1) {
                alert(`Không thể xóa! Hãy xóa ${response} bình luận của sản phẩm này trước!`);
                return;
              }
              else {
                this.productService.deleteProductByAdmin(id).subscribe(
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
}
