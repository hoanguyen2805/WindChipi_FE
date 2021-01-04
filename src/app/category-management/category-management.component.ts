import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Categories } from '../models/categories';
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: Categories[] = Array();
  size: number = 0;
  currentPage = 1;
  hien: boolean = false;
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
  }
  getSize() {
    this.categoryService.getCategories().subscribe(
      res => this.size = res.length
    )
  }
  pageChanged(event: any): void {
    this.categoryService.paging(event.page - 1).subscribe(
      res => this.categories = res
    )
  }
  add(name: string) {
    if(name.trim().length === 0){
      alert("Hãy nhập tên!");
      return;
    }
    const category: Categories = new Categories();
    category.name = name;
    this.categoryService.add(category).subscribe(
      res => {
        alert("Đã tạo!");
        window.location.reload();
      }
    )
  }
  update(id: number, name: string) {
    if(name.trim().length === 0){
      alert("Hãy nhập tên!");
      return;
    }
    const category: Categories = new Categories();
    category.id = id;
    category.name = name;
    this.categoryService.update(category).subscribe(
      res => {
        alert("Đã cập nhật!");
        window.location.reload();
      }
    )
  }
  delete(id: number) {
    this.categoryService.getProductsByCategory(id).subscribe(
      res => {
        if (res.products.length == 0) {
          this.categoryService.delete(id).subscribe(
            response => {
              alert("Đã xóa!");
              window.location.reload();
            }
          )
        }
        else {
          alert(`Có ${res.products.length} sản phẩm thuộc loại sản phẩm này!\nHãy xóa những sản phẩm đó trước`)
        }
      }
    )
  }
  hienThi() {
    this.hien = !this.hien;
  }
  an() {
    this.hien = !this.hien;
  }
}
