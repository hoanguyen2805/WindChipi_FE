import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
import { UploadFileService } from '../service/uploadfile.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../service/categories.service';
import { Categories } from '../models/categories';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  // START FILE
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  urlImage: string;

  selectedFiles2: FileList;
  currentFile2: File;
  progress2 = 0;
  message2 = '';
  urlImage2: string;

  selectedFiles3: FileList;
  currentFile3: File;
  progress3 = 0;
  message3 = '';
  urlImage3: string;
  // fileInfos: Observable<any>;



  // END FILE
  searchText: string;
  idProduct: number;
  formInsert: FormGroup;
  formUpdate: FormGroup;
  modalRef: BsModalRef;
  products: Products[] = new Array();
  size: number = 0;
  currentPage = 1;
  categories: Categories[] = new Array();
  constructor(private productService: ProductService, private uploadService: UploadFileService,
    private modalService: BsModalService, private fb: FormBuilder, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
    this.getCategories();
    this.formInsert = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      sold: [0, [Validators.required, Validators.min(0)]],
      total: [0, [Validators.required, Validators.min(0)]],
      describe: ['', Validators.required],
      categories_id: ['', Validators.required],
    })
    this.formUpdate = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      sold: [0, [Validators.required, Validators.min(0)]],
      total: [0, [Validators.required, Validators.min(0)]],
      describe: ['', Validators.required],
      categories_id: ['', Validators.required],
    })
    // this.fileInfos = this.uploadService.getFiles();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => this.categories = res
    )
  }

  search(page: number) {
    if (this.searchText == undefined) {
      this.searchText = "";
    }
    this.currentPage = 1;
    this.getSize();
    this.productService.searchProduct(this.searchText, page).subscribe(
      res => this.products = res
    )

  }
  getSize() {
    if (this.searchText == undefined) {
      this.searchText = "";
    }
    this.productService.getSize(this.searchText).subscribe(
      res => this.size = res
    )
  }
  pageChanged(event: any): void {
    this.search(event.page - 1);
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

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.urlImage = undefined;
    this.urlImage2 = undefined;
    this.urlImage3 = undefined;
  }
  selectFile(event) {
    // Khi bấm vào nút chọn file rồi chọn xong file thì nó sẽ gọi hàm này
    // selectedfiles là 1 mảng file nhưng ở đây nó chỉ luôn chứa 1 file
    // file đó sẽ có name: tên file và 1 vài thông tin khác 
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = "Upload hình 1 thành công!";
          this.urlImage = "http://localhost:8080/api/files/files/" + event.body.message;
          // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Lỗi! Hình 1 quá nặng hoặc đã tồn tại!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
  selectFile2(event) {
    this.selectedFiles2 = event.target.files;
  }
  upload2() {
    this.progress2 = 0;

    this.currentFile2 = this.selectedFiles2.item(0);
    this.uploadService.upload(this.currentFile2).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress2 = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message2 = "Upload hình 2 thành công!";
          this.urlImage2 = "http://localhost:8080/api/files/files/" + event.body.message;
        }
      },
      err => {
        this.progress2 = 0;
        this.message2 = 'Lỗi! Hình 2 quá nặng hoặc đã tồn tại!';
        this.currentFile2 = undefined;
      });

    this.selectedFiles2 = undefined;
  }
  selectFile3(event) {
    this.selectedFiles3 = event.target.files;
  }
  upload3() {
    this.progress3 = 0;

    this.currentFile3 = this.selectedFiles3.item(0);
    this.uploadService.upload(this.currentFile3).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress3 = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message3 = "Upload hình 3 thành công!";
          this.urlImage3 = "http://localhost:8080/api/files/files/" + event.body.message;
        }
      },
      err => {
        this.progress3 = 0;
        this.message3 = 'Lỗi! Hình 3 quá nặng hoặc đã tồn tại!';
        this.currentFile3 = undefined;
      });

    this.selectedFiles3 = undefined;
  }
  onSubmit() {
    const newProduct: Products = new Products();
    newProduct.name = this.formInsert.value.name;
    newProduct.price = this.formInsert.value.price;
    newProduct.sold = this.formInsert.value.sold;
    newProduct.total = this.formInsert.value.total;
    newProduct.describe = this.formInsert.value.describe;
    if (this.urlImage !== undefined) {
      newProduct.images = this.urlImage;
    }
    if (this.urlImage2 !== undefined) {
      newProduct.images2 = this.urlImage2;
    }
    if (this.urlImage3 !== undefined) {
      newProduct.images3 = this.urlImage3;
    }
    newProduct.categories_id = this.formInsert.value.categories_id;
    console.log(newProduct);
    this.productService.save(newProduct).subscribe(
      res => {
        alert("Thêm sản phẩm thành công!");
        window.location.reload();
      }
    )
  }


  openModalWithClass2(template: TemplateRef<any>, product: Products) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.urlImage = undefined;
    this.urlImage2 = undefined;
    this.urlImage3 = undefined;
    if (product.images) {
      this.urlImage = product.images.toString();
    }
    if (product.images2) {
      this.urlImage2 = product.images2.toString();
    }
    if (product.images3) {
      this.urlImage3 = product.images3.toString();
    }

    this.idProduct = +product.id;
    this.formUpdate.patchValue({
      name: product.name,
      price: product.price,
      sold: product.sold,
      total: product.total,
      describe: product.describe,
      categories_id: product.categories_id
    })
  }
  updateProduct() {
    const product: Products = new Products();
    product.id = this.idProduct;
    product.name = this.formUpdate.value.name;
    product.price = this.formUpdate.value.price;
    product.sold = this.formUpdate.value.sold;
    product.total = this.formUpdate.value.total;
    product.describe = this.formUpdate.value.describe;
    product.categories_id = this.formUpdate.value.categories_id;
    if (this.urlImage !== undefined) {
      product.images = this.urlImage;
    }
    if (this.urlImage2 !== undefined) {
      product.images2 = this.urlImage2;
    }
    if (this.urlImage3 !== undefined) {
      product.images3 = this.urlImage3;
    }
    console.log(product);
    this.productService.update(product).subscribe(
      res => {
        alert("Cập nhật sản phẩm thành công!");
        window.location.reload();
      }
    )
  }
}
