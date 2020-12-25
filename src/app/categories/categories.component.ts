import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../service/categories.service';
import { Categories } from '../models/categories';
import { Products } from '../models/product';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  category: Categories = new Categories();
  products: Products[] = new Array();
  currentPage = 1;
  page: number;
  trang: Products[];
  constructor(private route: ActivatedRoute, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.categoryService.getProductsByCategory(id).subscribe(
        res => {
          this.category = res;
          this.products = res.products;
          this.trang = this.pagenate(this.products, 8, 1);
        }
      )
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
