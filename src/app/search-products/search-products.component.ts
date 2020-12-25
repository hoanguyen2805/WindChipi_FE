import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  products: Products[] = new Array();
  currentPage = 1;
  page: number;
  trang: Products[];
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const category: Number = +params.get('category');
      const keyword = params.get('keyword');
      if (keyword === null) {
        this.productService.searchProductWithNoKeyword(category).subscribe(
          res => {
            this.products = res;
            this.trang = this.pagenate(this.products, 8, 1);
          }
        )
      }
      else {
        this.productService.searchProductsWithKeyword(category, keyword).subscribe(
          res => {
            this.products = res;
            this.trang = this.pagenate(this.products, 8, 1);
          }
        )
      }
    })
  }
  pageChanged(event: any): void {
    this.page = event.page;
    console.log(this.page);
    this.trang = this.pagenate(this.products, 8, this.page);
  }
  // pagenate(tong san pham, so san pham 1 trang, trang hien tai)
  pagenate(array: Products[], itemsPerPage: number, currentPage: number) {
    return array.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }
}
